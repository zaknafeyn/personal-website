import { ParsedArg } from "./parseCommand";

export const COMMAND_HELP = "help";
export const COMMAND_ABOUT = "about";
export const COMMAND_PROJECTS = "projects";
export const COMMAND_CONTACTS = "contacts";
export const COMMAND_AWARDS = "awards";
export const COMMAND_REPO = "repo";
export const COMMAND_SKILLS = "skills";
export const COMMAND_WEBSITE = "website";
export const COMMAND_STATS = "stats";
export const COMMAND_GAME = "game";

export const UTILITY_COMMAND_CLEAR = "clear";
export const UTILITY_COMMAND_ALL = "all";
export const UTILITY_COMMAND_CV = "cv";

export const echoCommands = [
  COMMAND_HELP,
  COMMAND_ABOUT,
  // COMMAND_PROJECTS,
  COMMAND_CONTACTS,
  // COMMAND_AWARDS,
  COMMAND_REPO,
  COMMAND_SKILLS,
  COMMAND_WEBSITE,
  COMMAND_STATS,
  COMMAND_GAME,
] as const;

export type EchoCommand = (typeof echoCommands)[number];

export const utilityCommands = [
  UTILITY_COMMAND_CLEAR,
  UTILITY_COMMAND_ALL,
  UTILITY_COMMAND_CV,
] as const;

export type UtilityCommand = (typeof utilityCommands)[number];

export const allCommandsArr = [
  ...echoCommands,
  ...utilityCommands,
] as unknown as string[];
export const allCommands = [...echoCommands, ...utilityCommands] as const;

export type Command = (typeof allCommands)[number];

export interface CommandProps {
  setCommandFinished: () => void;
  args?: ParsedArg[];
  clearOutput?: () => void;
}
