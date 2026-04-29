import { FC, Fragment } from "react";
import { allOutputCommands, CommandProps } from "../types";

import { COMMANDS_MAPPING } from "../consts";
import styles from './allCommand.module.css';

export const AllCommand: FC<CommandProps> = () => {
  return (
    <>
      { allOutputCommands.map((command) => {
          const Component = COMMANDS_MAPPING[command];
          
          return (
            <Fragment key={command}>
              <div className={styles.terminalHeading}>{command}</div>
                <Component />
            </Fragment>
          )
        })
      }
    </>
  )
};
