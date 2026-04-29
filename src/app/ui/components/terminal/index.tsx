'use client'

import React, { ComponentType, FC, JSX, ReactElement, Suspense, useCallback, useEffect, useState } from "react";
import ErrorMessage from "../errorMessage";
import InputArea from "../inputArea";
import TerminalOutput from "../terminalOutput";
import WelcomeMessage from "../welcomeMessage";
import { Loading } from "../loading";

import {
  allCommands,
  COMMAND_GAME,
  COMMAND_SKILLS,
  COMMAND_STATS,
  Command,
  CommandProps,
  UTILITY_COMMAND_ALL,
} from "../../commands/types";
import styles from './terminal.module.css';
import { getClosestCommand, isEchoCommand, isUtilityCommand, isValidCommand } from "./utils";

import { COMMANDS_MAPPING, UTILITY_COMMANDS_MAPPING } from "app/ui/commands/consts";
import { parseCommand } from "app/ui/commands/parseCommand";
import { Text } from "../text";

type TerminalProps = {
  terminalPrompt: ReactElement | string
  banner?: ReactElement;
  welcomeMessage?: string;
};

type CommandCompletionMode = "rendered" | "resolved" | "manual";

const RESOLVED_COMPLETION_COMMANDS: ReadonlySet<Command> = new Set([
  COMMAND_SKILLS,
  COMMAND_STATS,
  UTILITY_COMMAND_ALL,
]);

const MANUAL_COMPLETION_COMMANDS: ReadonlySet<Command> = new Set([
  COMMAND_GAME,
]);

function getCommandCompletionMode(command: Command): CommandCompletionMode {
  if (MANUAL_COMPLETION_COMMANDS.has(command)) return "manual";
  if (RESOLVED_COMPLETION_COMMANDS.has(command)) return "resolved";

  return "rendered";
}

const CommandCompletionMarker: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return null;
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
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const inputAreaRef = React.useRef<HTMLInputElement | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) return;

    const keepFocus = () => {
      if (document.activeElement !== input) {
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
  }, [isCommandFinished]);

  const scrollLastCommandTop = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(scrollLastCommandTop, [output]);

  const finishCommand = useCallback(() => {
    setIsCommandFinished(true)
  }, [])

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
      inputCommand = parseCommand(input.toLowerCase());
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

    const { command, args } = inputCommand;
    if (!isValidCommand(command)) {
      setOutput((prev) => [
        ...prev,
        commandRecord,
        <React.Fragment key={prev.length}>
          <ErrorMessage command={command} suggestedCommand={getClosestCommand(command)} />
          <CommandCompletionMarker onComplete={finishCommand} />
        </React.Fragment>,
      ]);

      return;
    }
    
    if (isEchoCommand(command)) {
      const Component = COMMANDS_MAPPING[command];
      const props = {
        args,
        params: inputCommand.params,
      };

      setOutput((prev) => [
        ...prev,
        commandRecord,
        <React.Fragment key={prev.length}>
          {renderCommandOutput(command, Component, props)}
        </React.Fragment>,
      ]);

      return;
    }

    if (isUtilityCommand(command)) {
      const Component = UTILITY_COMMANDS_MAPPING[command];
      const props = {
        args,
        params: inputCommand.params,
        clearOutput,
      };

      const commandOutput = renderCommandOutput(command, Component, props);

      setOutput((prev) => [
        ...prev,
        commandRecord,
        <React.Fragment key={prev.length}>{commandOutput}</React.Fragment>,
      ]);
    }
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
    if (event.key === "Tab") {
      // Prevent tab from moving focus
      event.preventDefault();
    }
    inputRef.current?.focus();
  };

  return (
    <div className={styles.terminalContainer} tabIndex={-1} onKeyDown={focusOnInput}>
      <div className={styles.terminalContent}>
        {banner}
        {welcomeMessage && (
          <WelcomeMessage message={welcomeMessage} inputRef={inputRef} inputAreaRef={inputAreaRef} />
        )}
        <TerminalOutput outputs={output} />
        {isCommandFinished && <InputArea
          setOutput={setOutput}
          processCommand={processCommand}
          getHistory={getHistory}
          getAutocomplete={getAutocomplete}
          inputRef={inputRef}
          inputAreaRef={inputAreaRef}
          terminalPrompt={terminalPrompt}
          placeholder="Type a command ..."
        />}
      </div>
    </div>
  );
};

export default Terminal;
