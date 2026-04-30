import { FC, Fragment } from "react";
import { allOutputCommandEntries } from "../registry";
import type { CommandTextOutputLoader } from "../registry";
import type { CommandProps } from "../types";
import styles from './allCommand.module.css';

type AllOutputCommandEntry = (typeof allOutputCommandEntries)[number];
type TextOutputCommandEntry = AllOutputCommandEntry & {
  getTextOutput: CommandTextOutputLoader;
};

function hasTextOutput(command: AllOutputCommandEntry): command is TextOutputCommandEntry {
  return "getTextOutput" in command;
}

export const getTextOutput = async (): Promise<string> => {
  const output = await Promise.all(
    allOutputCommandEntries
      .filter(hasTextOutput)
      .map(async (command) => {
        const text = await command.getTextOutput();

        return `${command.name}\n${text ?? ""}`;
      })
  );

  return output.join("\n\n");
};

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
