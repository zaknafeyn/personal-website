import { FC, Fragment } from "react";
import { allOutputCommandEntries } from "../registry";
import type { CommandProps } from "../types";
import styles from './allCommand.module.css';

export const AllCommand: FC<CommandProps> = () => {
  return (
    <>
      { allOutputCommandEntries.map((command) => {
          const Component = command.component;
          
          return (
            <Fragment key={command.name}>
              <div className={styles.terminalHeading}>{command.name}</div>
                <Component />
            </Fragment>
          )
        })
      }
    </>
  )
};
