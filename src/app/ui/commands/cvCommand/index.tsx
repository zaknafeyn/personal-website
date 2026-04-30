import { downloadFile } from "app/ui/utils/downloadFile";
import type { CommandEffect } from "../types";

export const runCvCommandEffect: CommandEffect = ({ args = [] }) => {
  const show = args.some((arg) => {
    if (!Object.hasOwn(arg, "show")) {
      return false;
    }

    return arg["show"] === true;
  });

  if (show) {
    window.open("/CV.pdf", "_blank");
  } else {
    downloadFile("CV.pdf", "Valentyn_Radchuk-Software_Engineer.pdf");
  }
};
