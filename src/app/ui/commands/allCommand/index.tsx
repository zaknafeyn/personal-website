import { FC, Fragment } from "react";
import { CommandProps, echoCommands } from "../types";

import { COMMANDS_MAPPING } from "../consts";
import styles from './allCommand.module.css';

export const AllCommand: FC<CommandProps> = ({ setCommandFinished }) => {
  
  
  return (
    <>
      { echoCommands.map((command) => {
          const Component = COMMANDS_MAPPING[command];
          const props = { setCommandFinished };
          
          return (
            <Fragment key={command}>
              <div className={styles.terminalHeading}>{command}</div>
              <div className={styles.terminalCommandOutput}>
                <Component {...props} />
              </div>
            </Fragment>
          )
        })
      }
    </>
  )
};
