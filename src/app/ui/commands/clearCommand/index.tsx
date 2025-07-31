import { FC, useEffect } from "react";
import { CommandProps } from "../types";

export const ClearCommand: FC<CommandProps> = ({ clearOutput, setCommandFinished }) => {
  
  useEffect(() => {
    clearOutput?.();
    setCommandFinished();
   }, [
    clearOutput, setCommandFinished
  ])
  

  return null;
};
