import { FC } from "react";
import { CommandProps } from "../types";
import { getHelpContent } from "../content";
import { CommandContentView } from "../contentRenderer";

export const HelpCommand: FC<CommandProps> = () => {
  const content = getHelpContent();

  return (
    <div>
      <CommandContentView content={content} />
    </div>
  );
};
