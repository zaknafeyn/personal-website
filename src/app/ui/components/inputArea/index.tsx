'use client'

import React, { FC, JSX, useMemo, useState } from "react";
import styles from "./inputArea.module.css";

type InputAreaProps = {
  terminalPrompt: JSX.Element | string;
  setOutput: React.Dispatch<React.SetStateAction<(string | JSX.Element)[]>>;
  processCommand: (input: string) => void;
  getHistory: (direction: "up" | "down") => string;
  getAutocomplete: (input: string) => string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputAreaRef: React.RefObject<HTMLInputElement | null>;
  placeholder?: string;
};
const InputArea: FC<InputAreaProps> = ({
    terminalPrompt,
    setOutput,
    processCommand,
    getHistory,
    getAutocomplete,
    inputRef,
    inputAreaRef,
    placeholder
  }) => {
  const [input, setInput] = useState("");
  /**
   * Sets the input state to the value of the input.
   *
   * If the input is a period, we get the autocomplete for the input up to, but excluding the period.
   * We handle this case specially to allow autocomplete on mobile because KeyboardEvent.key tends to be 'unidentified' for inputs on mobile keyboards.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.charAt(inputValue.length - 1) === ".") {
      setInput(
        getAutocomplete(inputValue.substring(0, inputValue.length - 1))
      );
    } else setInput(inputValue);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        processCommand(input);
        setInput("");
        break;
      case "ArrowUp":
        event.preventDefault();
        setInput(getHistory("up"));
        break;
      case "ArrowDown":
        event.preventDefault();
        setInput(getHistory("down"));
        break;
      case "Tab":
        // Provide autocomplete on tab. For mobile, we have to handle autocomplete in the input's onChange event.
        event.preventDefault();
        setInput(getAutocomplete(input));
        break;
    }
  };

  const isStringPrompt = useMemo(() => typeof terminalPrompt === "string", [terminalPrompt]);
  

  return (
    <div className={styles.terminalInputArea} ref={inputAreaRef}>
      {isStringPrompt && <div className={styles.terminalPromptString}>{terminalPrompt}</div>}
      {!isStringPrompt && terminalPrompt}
      <input
        placeholder={placeholder}
        aria-label="terminal-prompt"
        type="text"
        className={styles.terminalInput}
        name="input"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
      />
    </div>
  );
};

export default InputArea;
