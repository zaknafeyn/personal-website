import React, { FC, useEffect, useState } from "react";
import styles from './welcomeMessage.module.css'
import { Text } from "../text";

type WelcomeMessageProps = {
  message: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputAreaRef: React.RefObject<HTMLInputElement | null>;
};

const WelcomeMessage: FC<WelcomeMessageProps> = ({ inputRef, inputAreaRef, message}) => {
  const [visibleMessage, setVisibleMessage] = useState("");

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.disabled = true;
    }

    if (inputAreaRef?.current) {
      inputAreaRef.current.style.visibility = 'hidden'
    }

    let index = 0;
    setVisibleMessage("");

    const finishTyping = () => {
      if (inputAreaRef?.current) {
        inputAreaRef.current.style.visibility = 'visible';
      }

      if (inputRef?.current) {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }
    };

    if (!message.length) {
      finishTyping();
      return;
    }

    const typeText = setInterval(() => {
      index += 1;
      setVisibleMessage(message.slice(0, index));

      if (index >= message.length) {
        clearInterval(typeText);
        finishTyping();
      }
    }, 20);

    return () => {
      clearInterval(typeText);
      finishTyping();
    };
  }, [inputRef, message, inputAreaRef]);

  return (
    <Text.Terminal className={styles.terminalWelcomeMessage}>{visibleMessage}</Text.Terminal>
  );
};

export default WelcomeMessage;
