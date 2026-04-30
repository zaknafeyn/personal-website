import type { CommandEffect } from "../types";

export const runClearCommandEffect: CommandEffect = ({ clearOutput }) => {
  clearOutput?.();
};
