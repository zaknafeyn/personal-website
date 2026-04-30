import { FC } from "react";

import { CommandContentView } from "../contentRenderer";
import { commandContentToPlainText, getNowContent } from "../content";
import type { CommandProps } from "../types";

export const getTextOutput = () => commandContentToPlainText(getNowContent());

export const NowCommand: FC<CommandProps> = () => {
  return <CommandContentView content={getNowContent()} />;
};
