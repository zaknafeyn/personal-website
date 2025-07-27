import React, { FC, useEffect } from "react";
import styles from './errorMessage.module.css'
import { CommandProps } from "app/ui/commands/types";

interface ErrorMessageProps extends CommandProps {
  command: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ command, setCommandFinished }) => {
  
  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

  return (
    <div className={styles.terminalErrorGroup}>
      <span className={styles.terminalError}>
        {`command not found: ${command}.`}
      </span>
      <span>{`Type 'help' to view a list of available commands`}</span>
    </div>
  );
};

export default ErrorMessage;
