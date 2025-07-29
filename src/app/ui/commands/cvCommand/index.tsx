import { FC, useEffect, useMemo } from "react";
import { downloadFile } from "app/ui/utils/downloadFile";
import { CommandProps } from "../types";

export const CvCommand: FC<CommandProps> = ({ setCommandFinished, args = [] }) => {
  
  const show = useMemo(() => args.some((arg) => {
    if (!Object.hasOwn(arg, "show")) {
      return false;
    }

    return arg["show"] === true;
  }), [args]);

  useEffect(() => {    
      setCommandFinished();
  }, [setCommandFinished]);

  
  if (show) {
    window.open("/CV.pdf", "_blank");
  } else {
    downloadFile("CV.pdf", "Valentyn_Radchuk-Software_Engineer.pdf");
  }

  return null;
};
