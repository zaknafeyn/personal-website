import { FC, useEffect } from "react";
import { CommandProps } from "../types";

export const ClearCommand: FC<CommandProps> = ({ clearOutput, setCommandFinished }) => {
  
  useEffect(() => {
    console.log('Run effect..')
    clearOutput?.();
    setCommandFinished();
   }, [
    clearOutput, setCommandFinished
  ])
  

  return null;
};
