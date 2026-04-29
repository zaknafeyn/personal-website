import React, { FC, useEffect, useState } from "react";
import styles from './welcomeMessage.module.css'
import { Text } from "../text";

type WelcomeMessageProps = {
  message: string;
  onComplete: () => void;
};

const WelcomeMessage: FC<WelcomeMessageProps> = ({ message, onComplete }) => {
  const [visibleMessage, setVisibleMessage] = useState("");

  useEffect(() => {
    let index = 0;
    setVisibleMessage("");

    if (!message.length) {
      onComplete();
      return;
    }

    const typeText = setInterval(() => {
      index += 1;
      setVisibleMessage(message.slice(0, index));

      if (index >= message.length) {
        clearInterval(typeText);
        onComplete();
      }
    }, 20);

    return () => {
      clearInterval(typeText);
    };
  }, [message, onComplete]);

  return (
    <Text.Terminal className={styles.terminalWelcomeMessage}>{visibleMessage}</Text.Terminal>
  );
};

export default WelcomeMessage;
