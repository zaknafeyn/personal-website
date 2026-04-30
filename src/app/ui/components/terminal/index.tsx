'use client'

import React, { ComponentType, FC, JSX, ReactElement, Suspense, useCallback, useEffect, useRef, useState } from "react";
import ErrorMessage from "../errorMessage";
import InputArea from "../inputArea";
import TerminalOutput from "../terminalOutput";
import WelcomeMessage from "../welcomeMessage";
import { Loading } from "../loading";

import {
  allCommands,
  getCommandCompletionMode,
  getCommandComponent,
  resolveCommandName,
  suggestedCommandEntries,
} from "../../commands/registry";
import type { Command, CommandProps } from "../../commands/types";
import styles from './terminal.module.css';
import { getClosestCommand } from "./utils";
import { parseCommand } from "app/ui/commands/parseCommand";
import type { ParsedRedirect } from "app/ui/commands/parseCommand";
import { canRedirectCommand, getCommandTextOutput } from "app/ui/commands/textOutput";
import { downloadFile } from "app/ui/utils/downloadFile";
import { Text } from "../text";

type TerminalProps = {
  terminalPrompt: ReactElement | string
  banner?: ReactElement;
  welcomeMessage?: string;
};

function hasArg(args: CommandProps["args"], name: string): boolean {
  return args?.some((arg) => Boolean(arg[name])) ?? false;
}

function shouldShowHelpSuggestions(args: CommandProps["args"]): boolean {
  return hasArg(args, "links") || hasArg(args, "l");
}

const CommandCompletionMarker: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return null;
};

function getSafeTextFilename(filename: string | undefined, command: Command): string {
  const fallback = `${command}.txt`;
  const safeName = filename?.replace(/[\\/:*?"<>|]/g, "-").trim();

  if (!safeName) return fallback;

  return safeName.toLowerCase().endsWith(".txt")
    ? safeName
    : `${safeName}.txt`;
}

const RedirectedCommandOutput: FC<{
  command: Command;
  onComplete: () => void;
  redirect: ParsedRedirect;
}> = ({ command, onComplete, redirect }) => {
  const [message, setMessage] = useState(`Saving ${command} output...`);
  const downloadedRef = useRef(false);
  const textOutputPromiseRef = useRef<Promise<string> | null>(null);

  useEffect(() => {
    let isMounted = true;
    let url: string | undefined;

    const writeRedirect = async () => {
      const downloadName = getSafeTextFilename(redirect.target, command);

      try {
        if (!canRedirectCommand(command)) {
          setMessage(`Command '${command}' does not support file redirection.`);
          return;
        }

        textOutputPromiseRef.current ??= getCommandTextOutput(command);
        const textOutput = await textOutputPromiseRef.current;
        const blob = new Blob([textOutput], {
          type: "text/plain;charset=utf-8",
        });

        if (!downloadedRef.current) {
          downloadedRef.current = true;
          url = URL.createObjectURL(blob);
          downloadFile(url, downloadName);
        }

        if (isMounted) {
          setMessage(`Saved ${command} output to ${downloadName}.`);
        }
      } catch (error) {
        console.error(`Failed to redirect command '${command}'`, error);

        if (isMounted) {
          setMessage(`Command '${command}' failed to save output.`);
        }
      } finally {
        if (url) {
          const objectUrl = url;
          window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
        }

        if (isMounted) {
          onComplete();
        }
      }
    };

    writeRedirect();

    return () => {
      isMounted = false;

      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [command, onComplete, redirect.target]);

  return <Text.Paragraph>{message}</Text.Paragraph>;
};

const CommandRuntimeError: FC<{ command: string; error?: Error }> = ({ command, error }) => (
  <div>
    <Text.Terminal>{`Command '${command}' failed.`}</Text.Terminal>
    {error?.message && <Text.Terminal>{error.message}</Text.Terminal>}
    <Text.Terminal>{`The prompt has been restored; try again or type 'help'.`}</Text.Terminal>
  </div>
);

type CommandErrorBoundaryProps = {
  children: React.ReactNode;
  command: string;
  onError: () => void;
};

type CommandErrorBoundaryState = {
  error?: Error;
};

class CommandErrorBoundary extends React.Component<CommandErrorBoundaryProps, CommandErrorBoundaryState> {
  state: CommandErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): CommandErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(`Command '${this.props.command}' failed`, error);
    this.props.onError();
  }

  render() {
    if (this.state.error) {
      return <CommandRuntimeError command={this.props.command} error={this.state.error} />;
    }

    return this.props.children;
  }
}

const Terminal: FC<TerminalProps> = ({ terminalPrompt = ">", banner, welcomeMessage }) => {

  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(3);
  const [isCommandFinished, setIsCommandFinished] = useState<boolean>(true);
  const [welcomeFinished, setWelcomeFinished] = useState(() => !welcomeMessage);
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const inputAreaRef = React.useRef<HTMLDivElement | null>(null);
  const firstSuggestionRef = React.useRef<HTMLButtonElement | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWelcomeFinished(!welcomeMessage);
  }, [welcomeMessage]);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) return;

    const keepFocus = () => {
      const activeElement = document.activeElement;

      if (
        activeElement !== input &&
        activeElement instanceof HTMLElement &&
        !activeElement.dataset.terminalInteractive
      ) {
        input.focus();
      }
    };

    input.focus(); // Focus on mount
    window.addEventListener('focus', keepFocus, true);  // capture phase
    input.addEventListener('blur', keepFocus);          // blur event is on the input

    return () => {
      window.removeEventListener('focus', keepFocus, true);
      input.removeEventListener('blur', keepFocus);
    };
  }, [isCommandFinished, welcomeFinished]);

  const scrollLastCommandTop = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(scrollLastCommandTop, [output]);

  const finishCommand = useCallback(() => {
    setIsCommandFinished(true)
  }, [])

  const finishWelcome = useCallback(() => {
    setWelcomeFinished(true);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const renderCommandOutput = useCallback((
    command: Command,
    Component: ComponentType<CommandProps>,
    props: CommandProps = {},
  ) => {
    const completionMode = getCommandCompletionMode(command);
    const commandProps = {
      ...props,
      ...(completionMode === "manual" ? { onComplete: finishCommand } : {}),
    };

    const commandOutput = (
      <>
        <Component {...commandProps} />
        {completionMode === "rendered" && <CommandCompletionMarker onComplete={finishCommand} />}
      </>
    );

    return (
      <CommandErrorBoundary command={command} onError={finishCommand}>
        {completionMode === "resolved" ? (
          <Suspense fallback={<Loading />}>
            {commandOutput}
            <CommandCompletionMarker onComplete={finishCommand} />
          </Suspense>
        ) : commandOutput}
      </CommandErrorBoundary>
    );
  }, [finishCommand]);


  const processCommand = (input: string) => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    // hide prompt until current command finish execution
    setIsCommandFinished(false);
    setShowCommandSuggestions(false);

    // Store a record of this command with a ref to allow us to scroll it into view.
    // Note: We use a ref callback here because setting the ref directly, then clearing output seems to set the ref to null.
    const commandRecord = (
      <div
        ref={(el) => {scrollRef.current = el}}
        className={styles.terminalCommandRecord}
      >
        {terminalPrompt}
        <span className={styles.terminalInput}>{input}</span>
      </div>
    );

    setHistory((prev) => {
      const nextHistory = [...prev, input];
      setHistoryIndex(nextHistory.length);
      return nextHistory;
    });

    // Now process command, ignoring case
    let inputCommand: ReturnType<typeof parseCommand>;
    try {
      inputCommand = parseCommand(trimmedInput);
    } catch (error) {
      console.error("Failed to parse command", error);
      setOutput((prev) => [
        ...prev,
        commandRecord,
        <React.Fragment key={prev.length}>
          <ErrorMessage command={trimmedInput} suggestedCommand={getClosestCommand(trimmedInput)} />
          <CommandCompletionMarker onComplete={finishCommand} />
        </React.Fragment>,
      ]);

      return;
    }

    const resolvedCommand = resolveCommandName(inputCommand.command);

    if (!resolvedCommand) {
      setOutput((prev) => [
        ...prev,
        commandRecord,
        <React.Fragment key={prev.length}>
          <ErrorMessage
            command={inputCommand.command}
            suggestedCommand={getClosestCommand(inputCommand.command)}
          />
          <CommandCompletionMarker onComplete={finishCommand} />
        </React.Fragment>,
      ]);

      return;
    }

    const command = resolvedCommand;
    const Component = getCommandComponent(command);
    const { args } = inputCommand;
    const props = {
      args,
      params: inputCommand.params,
      redirect: inputCommand.redirect,
      clearOutput,
    };

    if (command === "help" && shouldShowHelpSuggestions(args)) {
      setShowCommandSuggestions(true);
    }

    setOutput((prev) => [
      ...prev,
      commandRecord,
      <React.Fragment key={prev.length}>
        {inputCommand.redirect ? (
          <RedirectedCommandOutput
            command={command}
            onComplete={finishCommand}
            redirect={inputCommand.redirect}
          />
        ) : (
          renderCommandOutput(command, Component, props)
        )}
      </React.Fragment>,
    ]);
  };

  const getHistory = (direction: "up" | "down") => {
    let updatedIndex;
    if (direction === "up") {
      updatedIndex = historyIndex === 0 ? 0 : historyIndex - 1;
    } else {
      updatedIndex =
        historyIndex === history.length ? history.length : historyIndex + 1;
    }
    setHistoryIndex(updatedIndex);
    return updatedIndex === history.length ? "" : history[updatedIndex];
  };

  const getAutocomplete = (input: string) => {
    const matchingCommands = allCommands.filter((c) => c.startsWith(input));
    if (matchingCommands.length === 1) {
      return matchingCommands[0];
    } else {
      const commandRecord = (
        <div
          ref={(el) => { scrollRef.current = el }}
          className={styles.terminalCommandRecord}
        >
          <span className="terminal-prompt">{terminalPrompt}</span>{" "}
          <span>{input}</span>
        </div>
      );
      setOutput((prev) => [...prev, commandRecord, matchingCommands.join("    ")]);
      return input;
    }
  };

  const focusOnInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target;

    if (target === inputRef.current) {
      return;
    }

    if (
      target instanceof HTMLElement &&
      target.dataset.terminalInteractive
    ) {
      return;
    }

    if (event.key === "Tab") {
      // Prevent tab from moving focus
      event.preventDefault();
    }
    inputRef.current?.focus();
  };

  const focusFirstSuggestion = useCallback(() => {
    firstSuggestionRef.current?.focus();
  }, []);

  return (
    <div className={styles.terminalContainer} tabIndex={-1} onKeyDown={focusOnInput}>
      <div className={styles.terminalContent}>
        {banner}
        {welcomeMessage && (
          <WelcomeMessage message={welcomeMessage} onComplete={finishWelcome} />
        )}
        <TerminalOutput outputs={output} />
        {isCommandFinished && showCommandSuggestions && (
          <div className={styles.commandSuggestions} aria-label="Suggested commands">
            {suggestedCommandEntries.map(
              (command, index) => (
                <button
                  className={styles.commandSuggestion}
                  data-terminal-interactive="true"
                  key={command.name}
                  onClick={() => processCommand(command.name)}
                  ref={index === 0 ? firstSuggestionRef : undefined}
                  type="button"
                >
                  {command.name}
                </button>
              )
            )}
          </div>
        )}
        {isCommandFinished && welcomeFinished && <InputArea
          setOutput={setOutput}
          processCommand={processCommand}
          getHistory={getHistory}
          getAutocomplete={getAutocomplete}
          inputRef={inputRef}
          inputAreaRef={inputAreaRef}
          allowEmptyTabNavigation={showCommandSuggestions}
          onEmptyTab={focusFirstSuggestion}
          terminalPrompt={terminalPrompt}
          placeholder="Type a command ..."
        />}
      </div>
    </div>
  );
};

export default Terminal;
