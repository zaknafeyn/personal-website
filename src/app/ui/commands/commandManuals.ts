import {
  COMMAND_ABOUT,
  COMMAND_CONTACTS,
  COMMAND_GAME,
  COMMAND_HELP,
  COMMAND_NOW,
  COMMAND_PROJECTS,
  COMMAND_REPO,
  COMMAND_SKILLS,
  COMMAND_STACK,
  COMMAND_STATS,
  COMMAND_VERSION,
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
  redirects?: string[];
  notes?: string[];
};

export const COMMAND_MANUALS: Record<string, ManualEntry> = {
  [COMMAND_HELP]: {
    name: "help",
    synopsis: "help [--links | -l]",
    description: "Lists the available terminal commands with a short description for each one.",
    options: [
      "--links    Shows clickable command chips before the next prompt.",
      "-l         Shorthand for --links.",
    ],
  },
  [COMMAND_ABOUT]: {
    name: "about",
    synopsis: "about",
    description: "Prints a longer personal introduction, background, interests, and CV/contact hints.",
  },
  [COMMAND_PROJECTS]: {
    name: "projects",
    synopsis: "projects [> file.txt]",
    description:
      "Shows concise engineering case studies with problems, roles, constraints, stacks, architecture decisions, tradeoffs, and measurable results.",
    redirects: [
      "> file.txt    Downloads the plain-text projects output to the named file instead of printing the case studies in the terminal.",
    ],
  },
  [COMMAND_CONTACTS]: {
    name: "contacts",
    synopsis: "contacts",
    description: "Shows email and social links.",
  },
  [COMMAND_REPO]: {
    name: "repo",
    synopsis: "repo",
    description: "Shows links to public repositories, open-source work, and related code artifacts.",
  },
  [COMMAND_SKILLS]: {
    name: "skills",
    synopsis: "skills",
    description: "Fetches and prints grouped technical skills with level indicators.",
  },
  [COMMAND_WEBSITE]: {
    name: "website",
    synopsis: "website",
    description: "Explains how this terminal-style website was built.",
  },
  [COMMAND_STACK]: {
    name: "stack",
    synopsis: "stack",
    description:
      "Explains this website's App Router architecture, React Query data layer, command registry, API routes, deployment model, source links, and tradeoffs.",
    notes: [
      "This command focuses on the website architecture; the skills command shows a broader skill matrix.",
    ],
  },
  [COMMAND_NOW]: {
    name: "now",
    synopsis: "now",
    description:
      "Shows current focus areas, learning goals, recent shipped work, and availability.",
    notes: [
      "Use this for the freshest snapshot of what Valentyn is exploring and building toward.",
    ],
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
  [COMMAND_VERSION]: {
    name: "version",
    synopsis: "version",
    description:
      "Prints the current package version, git commit hash, and deployment id.",
    notes: ["Output format: package+commit+deployment."],
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
