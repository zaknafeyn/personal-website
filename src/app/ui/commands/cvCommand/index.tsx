import { FC, useEffect, useMemo, useRef } from "react";
import { downloadFile } from "app/ui/utils/downloadFile";
import type { CommandProps } from "../types";

export const CvCommand: FC<CommandProps> = ({ args = [] }) => {
  const hasRun = useRef(false);
  
  const show = useMemo(() => args.some((arg) => {
    if (!Object.hasOwn(arg, "show")) {
      return false;
    }

    return arg["show"] === true;
  }), [args]);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    if (show) {
      window.open("/CV.pdf", "_blank");
    } else {
      downloadFile("CV.pdf", "Valentyn_Radchuk-Software_Engineer.pdf");
    }
  }, [show]);

  return null;
};
