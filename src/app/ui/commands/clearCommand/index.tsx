import { FC, useEffect } from "react";
import { CommandProps } from "../types";

export const ClearCommand: FC<CommandProps> = ({ clearOutput }) => {
  
  useEffect(() => {
    clearOutput?.();
   }, [
    clearOutput
  ])
  

  return null;
};
