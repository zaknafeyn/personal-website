import React, { FC } from "react";
import { Text } from "../text";

import styles from './errorMessage.module.css'

interface ErrorMessageProps {
  command: string;
  suggestedCommand?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ command, suggestedCommand }) => {
  return (
    <div className={styles.terminalErrorGroup}>
      <Text.Terminal className={styles.terminalError}>
        {`command not found: ${command}.`}
      </Text.Terminal>
      {suggestedCommand && (
        <Text.Terminal>{`You might wanted to type '${suggestedCommand}'`}</Text.Terminal>
      )}
      <Text.Terminal>{`Type 'help' to view a list of available commands`}</Text.Terminal>
    </div>
  );
};

export default ErrorMessage;
