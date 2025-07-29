'use client'

import React, { ComponentType, FC, JSX, ReactElement, useCallback, useEffect, useState } from "react";
import ErrorMessage from "../errorMessage";
import InputArea from "../inputArea";
import TerminalOutput from "../terminalOutput";
import WelcomeMessage from "../welcomeMessage";

import styles from './terminal.module.css';
import { allCommands, COMMAND_ABOUT, COMMAND_CONTACTS, COMMAND_HELP, COMMAND_REPO, COMMAND_SKILLS, COMMAND_STATS, COMMAND_WEBSITE, echoCommands, EchoCommand, UTILITY_COMMAND_ALL, UTILITY_COMMAND_CV, UTILITY_COMMAND_CLEAR, CommandProps, UtilityCommand } from "../../commands/types";
import { isEchoCommand, isUtilityCommand, isValidCommand } from "./utils";

import {
  HelpCommand,
  AboutCommand,
  ContactsCommand,
  RepoCommand,
  SkillsCommand,
  WebsiteCommand,
  StatsCommand
} from "app/ui/commands";
import { parseCommand } from "app/ui/commands/parseCommand";
import { CvCommand } from "app/ui/commands/cvCommand";

type TerminalProps = {
  terminalPrompt: ReactElement | string
  banner?: ReactElement;
  welcomeMessage?: string;
};

const commands: { [key in EchoCommand]: ComponentType<CommandProps> } = {
    [COMMAND_HELP]: HelpCommand,
    [COMMAND_ABOUT]: AboutCommand,
    // [COMMAND_PROJECTS]: ProjectsCommand,
    [COMMAND_CONTACTS]: ContactsCommand,
    // [COMMAND_AWARDS]: AwardsCommand,
    [COMMAND_REPO]: RepoCommand,
    [COMMAND_SKILLS]: SkillsCommand,
    [COMMAND_WEBSITE]: WebsiteCommand,
    [COMMAND_STATS]: StatsCommand,
};

const utilityCommands: { [key in UtilityCommand]: ComponentType<CommandProps> } = {
  [UTILITY_COMMAND_CV]: CvCommand,
  [UTILITY_COMMAND_ALL]: CvCommand,
  [UTILITY_COMMAND_CLEAR]: CvCommand,
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

  /**
   * call this fn when command is finished to render next prompt after the command, 
   * setting state 'isCommandFinished' indicates that next prompt might be rendered
   * must be set in each command, otherwise prompt won't appear after the command
   */
  const setCommandFinished = useCallback(() => {
    setIsCommandFinished(true)
  }, [])

  const commandArgs = { setCommandFinished }


  const processCommand = (input: string) => {

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

    // Add command to to history if the command is not empty
    if (input.trim()) {
      setHistory([...history, input]);
      setHistoryIndex(history.length + 1);
    }

    // Now process command, ignoring case
    const inputCommand = parseCommand(input.toLowerCase());
    const { command, args } = inputCommand;
    console.info(args)
    if (!isValidCommand(command)) {
      setOutput([
        ...output,
        commandRecord,
        <div key={output.length} className={styles.terminalCommandOutput}>
          <ErrorMessage command={command} {...commandArgs}/>
        </div>,
      ]);

      return;
    }
    
    if (isEchoCommand(command)) {
      const Component = commands[command];
      // avoid passing args, as all commands needs to be ran in default mode
      const props = { setCommandFinished };
      setOutput([
        ...output,
        commandRecord,
        <div key={output.length} className={styles.terminalCommandOutput}>
          <Component {...props} />
        </div>,
      ]);

      return;
    }
    
    if (isUtilityCommand(command)) {
      switch (command) {
        case UTILITY_COMMAND_CLEAR: {
          setOutput([]);
          setCommandFinished();
          break;
        }
        case UTILITY_COMMAND_ALL: {
          // Output all commands in a custom order.
          const allCommandsOutput = echoCommands
            .map((command) => {
              const Component = commands[command];
              const props = { setCommandFinished, args };
              
              return (
                <>
                  <div className={styles.terminalHeading}>{command}</div>
                  <div className={styles.terminalCommandOutput}>
                    <Component {...props} />
                  </div>
                </>
              )
            });

          setOutput([commandRecord, ...allCommandsOutput]);
          break;
        }
        case UTILITY_COMMAND_CV: {
          const Component = utilityCommands[UTILITY_COMMAND_CV];
          const props = { setCommandFinished, args };
          const command = <Component {...props} />
          setOutput([...output, commandRecord, command]);
          break;
        }
      }
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
      setOutput([...output, commandRecord, matchingCommands.join("    ")]);
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
