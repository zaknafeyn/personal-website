import type { ComponentType } from "react";
import { AboutCommand } from "./aboutCommand";
import { AllCommand } from "./allCommand";
import { AwardsCommand } from "./awardsCommand";
import { ClearCommand } from "./clearCommand";
import { ContactsCommand } from "./contactsCommand";
import { CvCommand } from "./cvCommand";
import { GameCommand } from "./gameCommand";
import { HelpCommand } from "./helpCommand";
import { ManCommand } from "./manCommand";
import { NowCommand } from "./nowCommand";
import { ProjectsCommand } from "./projectsCommand";
import { RepoCommand } from "./repoCommand";
import { SkillsCommand } from "./skillsCommand";
import { StackCommand } from "./stackCommand";
import { StatsCommand } from "./statsCommand";
import { VersionCommand } from "./versionCommand";
import { WebsiteCommand } from "./websiteCommand";
import type { ParsedArg } from "./parseCommand";

export type CommandCompletionMode = "rendered" | "resolved" | "manual";
export type CommandKind = "echo" | "utility";

export interface CommandProps {
  onComplete?: () => void;
  args?: ParsedArg[];
  params?: string[];
  clearOutput?: () => void;
}

export type ManualEntry = {
  name: string;
  synopsis: string;
  description: string;
  arguments?: readonly string[];
  options?: readonly string[];
  redirects?: readonly string[];
  notes?: readonly string[];
};

type CommandRegistryEntry = {
  name: string;
  aliases: readonly string[];
  component: ComponentType<CommandProps>;
  description: string;
  manual: ManualEntry;
  includeInAll: boolean;
  completionMode: CommandCompletionMode;
  enabled: boolean;
  kind: CommandKind;
  suggested?: boolean;
};

export const commandRegistry = [
  {
    name: "help",
    aliases: [],
    component: HelpCommand,
    description: "Lists the available terminal commands with a short description for each one.",
    manual: {
      name: "help",
      synopsis: "help [--links | -l]",
      description: "Lists the available terminal commands with a short description for each one.",
      options: [
        "--links    Shows clickable command chips before the next prompt.",
        "-l         Shorthand for --links.",
      ],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
  },
  {
    name: "about",
    aliases: [],
    component: AboutCommand,
    description: "Good way to know something about me",
    manual: {
      name: "about",
      synopsis: "about",
      description: "Prints a longer personal introduction, background, interests, and CV/contact hints.",
    },
    includeInAll: true,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "projects",
    aliases: [],
    component: ProjectsCommand,
    description: "Engineering case studies, tradeoffs, results, and links",
    manual: {
      name: "projects",
      synopsis: "projects [> file.txt]",
      description:
        "Shows concise engineering case studies with problems, roles, constraints, stacks, architecture decisions, tradeoffs, and measurable results.",
      redirects: [
        "> file.txt    Downloads the plain-text projects output to the named file instead of printing the case studies in the terminal.",
      ],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "contacts",
    aliases: [],
    component: ContactsCommand,
    description: "Let's keep in touch",
    manual: {
      name: "contacts",
      synopsis: "contacts",
      description: "Shows email and social links.",
    },
    includeInAll: true,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "awards",
    aliases: [],
    component: AwardsCommand,
    description: "A bit of boasting",
    manual: {
      name: "awards",
      synopsis: "awards",
      description: "Shows awards and recognitions.",
      notes: ["This command is currently disabled until the content is refreshed."],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: false,
    kind: "echo",
  },
  {
    name: "repo",
    aliases: [],
    component: RepoCommand,
    description: "Take a look at some of my work",
    manual: {
      name: "repo",
      synopsis: "repo",
      description: "Shows links to public repositories, open-source work, and related code artifacts.",
    },
    includeInAll: true,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "skills",
    aliases: [],
    component: SkillsCommand,
    description: "I'm pretty good at some things",
    manual: {
      name: "skills",
      synopsis: "skills",
      description: "Fetches and prints grouped technical skills with level indicators.",
    },
    includeInAll: true,
    completionMode: "resolved",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "website",
    aliases: [],
    component: WebsiteCommand,
    description: "How I built this",
    manual: {
      name: "website",
      synopsis: "website",
      description: "Explains how and why this terminal-style website was built.",
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "stack",
    aliases: [],
    component: StackCommand,
    description: "Architecture, stack, tradeoffs, deployment, and source links",
    manual: {
      name: "stack",
      synopsis: "stack",
      description:
        "Explains this website's App Router architecture, React Query data layer, command registry, API routes, deployment model, source links, and tradeoffs.",
      notes: [
        "This command focuses on the website architecture; the skills command shows a broader skill matrix.",
      ],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "now",
    aliases: [],
    component: NowCommand,
    description: "Current focus, learning goals, recent work, and availability",
    manual: {
      name: "now",
      synopsis: "now",
      description: "Shows current focus areas, learning goals, recent shipped work, and availability.",
      notes: [
        "Use this for the freshest snapshot of what Valentyn is exploring and building toward.",
      ],
    },
    includeInAll: true,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "stats",
    aliases: [],
    component: StatsCommand,
    description: "See my stats on coding platforms",
    manual: {
      name: "stats",
      synopsis: "stats",
      description: "Fetches and prints coding-platform practice stats.",
    },
    includeInAll: true,
    completionMode: "resolved",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "game",
    aliases: [],
    component: GameCommand,
    description: "Let's play a game",
    manual: {
      name: "game",
      synopsis: "game",
      description: "Starts an interactive terminal game.",
      notes: ["The prompt stays hidden while the game is running."],
    },
    includeInAll: false,
    completionMode: "manual",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "version",
    aliases: [],
    component: VersionCommand,
    description: "Shows the current package, commit, and deployment version",
    manual: {
      name: "version",
      synopsis: "version",
      description: "Prints the current package version, git commit hash, and deployment id.",
      notes: ["Output format: package+commit+deployment."],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
  },
  {
    name: "cv",
    aliases: [],
    component: CvCommand,
    description: "Check out my CV [pdf - 132KB]",
    manual: {
      name: "cv",
      synopsis: "cv [--show]",
      description: "Downloads Valentyn Radchuk's CV as a PDF.",
      options: ["--show    Opens the CV in a new browser tab instead of downloading it."],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "utility",
    suggested: true,
  },
  {
    name: "all",
    aliases: [],
    component: AllCommand,
    description: "Tell me everything",
    manual: {
      name: "all",
      synopsis: "all",
      description: "Prints the output of every regular information command.",
      notes: ["Utility commands, including man, are not included in all output."],
    },
    includeInAll: false,
    completionMode: "resolved",
    enabled: true,
    kind: "utility",
  },
  {
    name: "clear",
    aliases: [],
    component: ClearCommand,
    description: "Clears the terminal of all output",
    manual: {
      name: "clear",
      synopsis: "clear",
      description: "Clears the terminal output.",
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "utility",
  },
  {
    name: "man",
    aliases: [],
    component: ManCommand,
    description: "Displays a brief manual page for a command",
    manual: {
      name: "man",
      synopsis: "man <command>",
      description: "Displays a compact manual page for a command.",
      arguments: ["command    Command name to describe, for example: man about."],
      notes: ["man is intentionally not included in all output."],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "utility",
  },
] as const satisfies readonly CommandRegistryEntry[];

export type RegisteredCommand = (typeof commandRegistry)[number];
export type Command = Extract<RegisteredCommand, { enabled: true }>["name"];
export type DisabledCommand = Extract<RegisteredCommand, { enabled: false }>["name"];
export type EchoCommand = Extract<RegisteredCommand, { enabled: true; kind: "echo" }>["name"];
export type UtilityCommand = Extract<RegisteredCommand, { enabled: true; kind: "utility" }>["name"];

export const commandHelpEntries = commandRegistry.filter((entry) => entry.name !== "help");
export const enabledCommandEntries = commandRegistry.filter((entry) => entry.enabled);
export const echoCommandEntries = enabledCommandEntries.filter((entry) => entry.kind === "echo");
export const utilityCommandEntries = enabledCommandEntries.filter((entry) => entry.kind === "utility");
export const allOutputCommandEntries = echoCommandEntries.filter((entry) => entry.includeInAll);
export const suggestedCommandEntries = enabledCommandEntries.filter(
  (entry) => "suggested" in entry && entry.suggested
);

export const allCommands = enabledCommandEntries.map((entry) => entry.name) as Command[];
export const allCommandTokens = enabledCommandEntries.flatMap((entry) => [
  entry.name,
  ...entry.aliases,
]);
export const echoCommands = echoCommandEntries.map((entry) => entry.name) as EchoCommand[];
export const utilityCommands = utilityCommandEntries.map((entry) => entry.name) as UtilityCommand[];
export const allOutputCommands = allOutputCommandEntries.map((entry) => entry.name) as EchoCommand[];

export const COMMANDS_MAPPING = Object.fromEntries(
  enabledCommandEntries.map((entry) => [entry.name, entry.component])
) as Record<Command, ComponentType<CommandProps>>;

export function getCommandEntry(command: string): RegisteredCommand | undefined {
  return commandRegistry.find((entry) => entry.name === command);
}

export function getEnabledCommandEntry(command: Command) {
  return enabledCommandEntries.find((entry) => entry.name === command);
}

export function getCommandComponent(command: Command): ComponentType<CommandProps> {
  return COMMANDS_MAPPING[command];
}

export function getCommandCompletionMode(command: Command): CommandCompletionMode {
  return getEnabledCommandEntry(command)?.completionMode ?? "rendered";
}

export function resolveCommandName(commandOrAlias: string): Command | undefined {
  const entry = enabledCommandEntries.find(
    (command) =>
      command.name === commandOrAlias ||
      (command.aliases as readonly string[]).includes(commandOrAlias)
  );

  return entry?.name;
}
