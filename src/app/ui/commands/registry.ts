import type { ComponentType } from "react";
import { AboutCommand, getTextOutput as getAboutTextOutput } from "./aboutCommand";
import { AllCommand, getTextOutput as getAllTextOutput } from "./allCommand";
import { runClearCommandEffect } from "./clearCommand";
import { ContactsCommand, getTextOutput as getContactsTextOutput } from "./contactsCommand";
import { runCvCommandEffect } from "./cvCommand";
import { ExperienceCommand, getTextOutput as getExperienceTextOutput } from "./experienceCommand";
import { GameCommand } from "./gameCommand";
import { HelpCommand, getTextOutput as getHelpTextOutput } from "./helpCommand";
import { ManCommand } from "./manCommand";
import { NowCommand, getTextOutput as getNowTextOutput } from "./nowCommand";
import { ProjectsCommand, getTextOutput as getProjectsTextOutput } from "./projectsCommand";
import { RepoCommand, getTextOutput as getRepoTextOutput } from "./repoCommand";
import { SkillsCommand, getTextOutput as getSkillsTextOutput } from "./skillsCommand";
import { StackCommand, getTextOutput as getStackTextOutput } from "./stackCommand";
import { StatsCommand, getTextOutput as getStatsTextOutput } from "./statsCommand";
import { VersionCommand, getTextOutput as getVersionTextOutput } from "./versionCommand";
import { WebsiteCommand, getTextOutput as getWebsiteTextOutput } from "./websiteCommand";
import type { ParsedArg, ParsedRedirect } from "./parseCommand";

export type CommandCompletionMode = "rendered" | "resolved" | "manual";
export type CommandKind = "echo" | "utility";
export type CommandTextOutputLoader = () => string | Promise<string>;
export type CommandEffectResult = string | void;
export type CommandEffect = (ctx: CommandEffectContext) => CommandEffectResult | Promise<CommandEffectResult>;

export interface CommandProps {
  onComplete?: () => void;
  args?: ParsedArg[];
  params?: string[];
  redirect?: ParsedRedirect;
  clearOutput?: () => void;
}

export type CommandEffectContext = Omit<CommandProps, "onComplete">;

export type ManualEntry = {
  name: string;
  synopsis: string;
  description: string;
  arguments?: readonly string[];
  options?: readonly string[];
  redirects?: readonly string[];
  notes?: readonly string[];
};

type BaseCommandRegistryEntry = {
  name: string;
  aliases: readonly string[];
  description: string;
  manual: ManualEntry;
  includeInAll: boolean;
  enabled: boolean;
  kind: CommandKind;
  suggested?: boolean;
};

type RenderedCommandRegistryEntry = BaseCommandRegistryEntry & {
  component: ComponentType<CommandProps>;
  effect?: never;
  getTextOutput?: CommandTextOutputLoader;
  completionMode: CommandCompletionMode;
};

type EffectCommandRegistryEntry = BaseCommandRegistryEntry & {
  component?: never;
  effect: CommandEffect;
  getTextOutput?: never;
  completionMode?: never;
};

type CommandRegistryEntry = RenderedCommandRegistryEntry | EffectCommandRegistryEntry;

const fileRedirectManual =
  "> file.txt    Downloads the plain-text command output to the named file instead of printing it in the terminal.";

export const commandRegistry = [
  {
    name: "help",
    aliases: [],
    component: HelpCommand,
    getTextOutput: getHelpTextOutput,
    description: "Lists the available terminal commands with a short description for each one.",
    manual: {
      name: "help",
      synopsis: "help [--links | -l] [> file.txt]",
      description: "Lists the available terminal commands with a short description for each one.",
      options: [
        "--links    Shows clickable command chips before the next prompt.",
        "-l         Shorthand for --links.",
      ],
      redirects: [fileRedirectManual],
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
    getTextOutput: getAboutTextOutput,
    description: "Good way to know something about me",
    manual: {
      name: "about",
      synopsis: "about [> file.txt]",
      description: "Prints a longer personal introduction, background, interests, and CV/contact hints.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getProjectsTextOutput,
    description: "Engineering case studies, tradeoffs, results, and links",
    manual: {
      name: "projects",
      synopsis: "projects [> file.txt]",
      description:
        "Shows concise engineering case studies with problems, roles, constraints, stacks, architecture decisions, tradeoffs, and measurable results.",
      redirects: [fileRedirectManual],
    },
    includeInAll: false,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "experience",
    aliases: ["timeline"],
    component: ExperienceCommand,
    getTextOutput: getExperienceTextOutput,
    description: "Chronological career progression by role, domain, and themes",
    manual: {
      name: "experience",
      synopsis: "experience [> file.txt]",
      description:
        "Shows a chronological career timeline with role, domain, and main engineering themes for each stage.",
      redirects: [fileRedirectManual],
      notes: [
        "timeline is an alias for experience.",
        "Use projects for deeper case studies and outcomes from selected work.",
      ],
    },
    includeInAll: true,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "contacts",
    aliases: [],
    component: ContactsCommand,
    getTextOutput: getContactsTextOutput,
    description: "Let's keep in touch",
    manual: {
      name: "contacts",
      synopsis: "contacts [> file.txt]",
      description: "Shows email and social links.",
      redirects: [fileRedirectManual],
    },
    includeInAll: true,
    completionMode: "rendered",
    enabled: true,
    kind: "echo",
    suggested: true,
  },
  {
    name: "repo",
    aliases: [],
    component: RepoCommand,
    getTextOutput: getRepoTextOutput,
    description: "Take a look at some of my work",
    manual: {
      name: "repo",
      synopsis: "repo [> file.txt]",
      description: "Shows links to public repositories, open-source work, and related code artifacts.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getSkillsTextOutput,
    description: "I'm pretty good at some things",
    manual: {
      name: "skills",
      synopsis: "skills [> file.txt]",
      description: "Fetches and prints grouped technical skills with level indicators.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getWebsiteTextOutput,
    description: "How I built this",
    manual: {
      name: "website",
      synopsis: "website [> file.txt]",
      description: "Explains how and why this terminal-style website was built.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getStackTextOutput,
    description: "Architecture, stack, tradeoffs, deployment, and source links",
    manual: {
      name: "stack",
      synopsis: "stack [> file.txt]",
      description:
        "Explains this website's App Router architecture, React Query data layer, command registry, API routes, deployment model, source links, and tradeoffs.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getNowTextOutput,
    description: "Current focus, learning goals, recent work, and availability",
    manual: {
      name: "now",
      synopsis: "now [> file.txt]",
      description: "Shows current focus areas, learning goals, recent shipped work, and availability.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getStatsTextOutput,
    description: "See my stats on coding platforms",
    manual: {
      name: "stats",
      synopsis: "stats [> file.txt]",
      description: "Fetches and prints coding-platform practice stats.",
      redirects: [fileRedirectManual],
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
    getTextOutput: getVersionTextOutput,
    description: "Shows the current package, commit, and deployment version",
    manual: {
      name: "version",
      synopsis: "version [> file.txt]",
      description: "Prints the current package version, git commit hash, and deployment id.",
      redirects: [fileRedirectManual],
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
    effect: runCvCommandEffect,
    description: "Check out my CV [pdf - 132KB]",
    manual: {
      name: "cv",
      synopsis: "cv [--show]",
      description: "Downloads Valentyn Radchuk's CV as a PDF.",
      options: ["--show    Opens the CV in a new browser tab instead of downloading it."],
    },
    includeInAll: false,
    enabled: true,
    kind: "utility",
    suggested: true,
  },
  {
    name: "all",
    aliases: [],
    component: AllCommand,
    getTextOutput: getAllTextOutput,
    description: "Tell me everything",
    manual: {
      name: "all",
      synopsis: "all [> file.txt]",
      description: "Prints the output of every regular information command.",
      redirects: [fileRedirectManual],
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
    effect: runClearCommandEffect,
    description: "Clears the terminal of all output",
    manual: {
      name: "clear",
      synopsis: "clear",
      description: "Clears the terminal output.",
    },
    includeInAll: false,
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
  enabledCommandEntries.flatMap((entry) =>
    "component" in entry ? [[entry.name, entry.component]] : []
  )
) as Partial<Record<Command, ComponentType<CommandProps>>>;

export function getCommandEntry(command: string): RegisteredCommand | undefined {
  return commandRegistry.find((entry) => entry.name === command);
}

export function getEnabledCommandEntry(command: Command) {
  return enabledCommandEntries.find((entry) => entry.name === command);
}

export function getCommandComponent(command: Command): ComponentType<CommandProps> {
  const component = COMMANDS_MAPPING[command];

  if (!component) {
    throw new Error(`Command '${command}' is not a rendered command.`);
  }

  return component;
}

export function getCommandCompletionMode(command: Command): CommandCompletionMode {
  const entry = getEnabledCommandEntry(command);

  return entry && "component" in entry ? entry.completionMode : "rendered";
}

export function getCommandEffect(command: Command): CommandEffect | undefined {
  const entry = getEnabledCommandEntry(command);

  return entry && "effect" in entry ? entry.effect : undefined;
}

export function resolveCommandName(commandOrAlias: string): Command | undefined {
  const entry = enabledCommandEntries.find(
    (command) =>
      command.name === commandOrAlias ||
      (command.aliases as readonly string[]).includes(commandOrAlias)
  );

  return entry?.name;
}
