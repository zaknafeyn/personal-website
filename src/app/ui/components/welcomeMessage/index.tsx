import React, { FC, useEffect } from "react";
import styles from './welcomeMessage.module.css'

type WelcomeMessageProps = {
  message: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputAreaRef: React.RefObject<HTMLInputElement | null>;
};

const WelcomeMessage: FC<WelcomeMessageProps> = ({ inputRef, inputAreaRef, message}) => {
  const welcomeMessageRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.disabled = true;
    }

    if (inputAreaRef?.current) {
      inputAreaRef.current.style.visibility = 'hidden'
    }

    let index = 0;
    const typeText = setInterval(() => {
      if (!welcomeMessageRef.current) {
        return;
      }
      welcomeMessageRef.current.insertAdjacentText(
        "beforeend",
        message[index++]
      );
      if (index === message.length) {
        clearInterval(typeText);
        if (inputAreaRef?.current) {
          inputAreaRef.current.style.visibility = 'visible';
        }

        if (inputRef?.current) {
          inputRef.current.disabled = false;  
          inputRef.current.focus();
        }
      }
    }, 30);
  }, [inputRef, message, inputAreaRef]);
  return (
    <div ref={welcomeMessageRef} className={styles.terminalWelcomeMessage}></div>
  );
};

export default WelcomeMessage;
