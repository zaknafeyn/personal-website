import { FC } from "react";

import { CommandContentView } from "../contentRenderer";
import { commandContentToPlainText, getStackContent } from "../content";
import type { CommandProps } from "../types";

export const getTextOutput = () => commandContentToPlainText(getStackContent());

export const StackCommand: FC<CommandProps> = () => {
  return <CommandContentView content={getStackContent()} />;
};
