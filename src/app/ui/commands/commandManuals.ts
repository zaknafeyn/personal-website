import { getCommandEntry, resolveCommandName } from "./registry";
import type { ManualEntry } from "./registry";

export type { ManualEntry };

export function getCommandManual(command: string): ManualEntry | undefined {
  const resolvedCommand = resolveCommandName(command);

  return getCommandEntry(resolvedCommand ?? command)?.manual;
}
