import { FC } from "react";

import { CommandContentView } from "../contentRenderer";
import { commandContentToPlainText, getExperienceContent } from "../content";
import type { CommandProps } from "../types";

export const getTextOutput = () => commandContentToPlainText(getExperienceContent());

export const ExperienceCommand: FC<CommandProps> = () => {
  return <CommandContentView content={getExperienceContent()} />;
};
