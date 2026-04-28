import { FC } from "react";

import { CommandProps } from "../types";
import { getAboutContent } from "../content";
import { CommandContentView } from "../contentRenderer";

export const AboutCommand: FC<CommandProps> = () => {
  return <CommandContentView content={getAboutContent()} />;
};
