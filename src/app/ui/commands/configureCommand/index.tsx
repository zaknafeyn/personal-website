import { FC, useEffect } from "react";
import { CommandProps } from "../types";

export const ConfigureCommand: FC<CommandProps> = ({ clearOutput }) => {
  
  useEffect(() => {
    clearOutput?.();
   }, [
    clearOutput
  ])
  

  return null;
};
