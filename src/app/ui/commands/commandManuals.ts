import {
  COMMAND_ABOUT,
  COMMAND_CONTACTS,
  COMMAND_GAME,
  COMMAND_HELP,
  COMMAND_REPO,
  COMMAND_SKILLS,
  COMMAND_STATS,
  COMMAND_WEBSITE,
  UTILITY_COMMAND_ALL,
  UTILITY_COMMAND_CLEAR,
  UTILITY_COMMAND_CV,
  UTILITY_COMMAND_MAN,
} from "./types";

type ManualEntry = {
  name: string;
  synopsis: string;
  description: string;
  arguments?: string[];
  options?: string[];
  notes?: string[];
};

export const COMMAND_MANUALS: Record<string, ManualEntry> = {
  [COMMAND_HELP]: {
    name: "help",
    synopsis: "help",
    description: "Lists the available terminal commands with a short description for each one.",
  },
  [COMMAND_ABOUT]: {
    name: "about",
    synopsis: "about",
    description: "Prints a longer personal introduction, background, interests, and CV/contact hints.",
  },
  [COMMAND_CONTACTS]: {
    name: "contacts",
    synopsis: "contacts",
    description: "Shows email and social links.",
  },
  [COMMAND_REPO]: {
    name: "repo",
    synopsis: "repo",
    description: "Shows links to public code repositories and related work.",
  },
  [COMMAND_SKILLS]: {
    name: "skills",
    synopsis: "skills",
    description: "Fetches and prints grouped technical skills with level indicators.",
  },
  [COMMAND_WEBSITE]: {
    name: "website",
    synopsis: "website",
    description: "Explains how this website was built.",
  },
  [COMMAND_STATS]: {
    name: "stats",
    synopsis: "stats",
    description: "Fetches and prints coding-platform practice stats.",
  },
  [COMMAND_GAME]: {
    name: "game",
    synopsis: "game",
    description: "Starts an interactive terminal game.",
    notes: ["The prompt stays hidden while the game is running."],
  },
  [UTILITY_COMMAND_CV]: {
    name: "cv",
    synopsis: "cv [--show]",
    description: "Downloads Valentyn Radchuk's CV as a PDF.",
    options: ["--show    Opens the CV in a new browser tab instead of downloading it."],
  },
  [UTILITY_COMMAND_ALL]: {
    name: "all",
    synopsis: "all",
    description: "Prints the output of every regular information command.",
    notes: ["Utility commands, including man, are not included in all output."],
  },
  [UTILITY_COMMAND_CLEAR]: {
    name: "clear",
    synopsis: "clear",
    description: "Clears the terminal output.",
  },
  [UTILITY_COMMAND_MAN]: {
    name: "man",
    synopsis: "man <command>",
    description: "Displays a compact manual page for a command.",
    arguments: ["command    Command name to describe, for example: man about."],
    notes: ["man is intentionally not included in all output."],
  },
};
