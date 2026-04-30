import { getEnabledCommandEntry } from "./registry";
import type { Command, CommandTextOutputLoader, RegisteredCommand } from "./registry";

function getTextOutputLoader(entry: RegisteredCommand): CommandTextOutputLoader | undefined {
  return "getTextOutput" in entry ? entry.getTextOutput : undefined;
}

export function canRedirectCommand(command: Command): boolean {
  const entry = getEnabledCommandEntry(command);

  return entry ? getTextOutputLoader(entry) !== undefined : false;
}

export async function getCommandTextOutput(command: Command): Promise<string> {
  const entry = getEnabledCommandEntry(command);
  const loader = entry ? getTextOutputLoader(entry) : undefined;

  if (!loader) {
    throw new Error(`Command '${command}' does not produce redirectable text output.`);
  }

  return loader();
}
