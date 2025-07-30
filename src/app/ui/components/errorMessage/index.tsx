import React, { FC, useEffect } from "react";
import { CommandProps } from "app/ui/commands/types";
import { Text } from "../text";

import styles from './errorMessage.module.css'

interface ErrorMessageProps extends CommandProps {
  command: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ command, setCommandFinished }) => {
  
  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

  return (
    <div className={styles.terminalErrorGroup}>
      <Text.Terminal className={styles.terminalError}>
        {`command not found: ${command}.`}
      </Text.Terminal>
      <Text.Terminal>{`Type 'help' to view a list of available commands`}</Text.Terminal>
    </div>
  );
};

export default ErrorMessage;
