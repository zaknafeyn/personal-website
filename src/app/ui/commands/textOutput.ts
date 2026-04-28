import { ISkill } from "app/api/skills/types";
import {
  COMMAND_ABOUT,
  COMMAND_CONTACTS,
  COMMAND_HELP,
  COMMAND_REPO,
  COMMAND_SKILLS,
  COMMAND_STATS,
  COMMAND_WEBSITE,
  Command,
  UTILITY_COMMAND_ALL,
} from "./types";
import {
  commandContentToPlainText,
  descriptionItemsToPlainText,
  getAboutContent,
  getContactsContent,
  getHelpContent,
  getRepoContent,
  getSkillGroupsContent,
  getStatsContent,
  getWebsiteContent,
  redirectedAllCommands,
  StatsData,
} from "./content";

type TextOutputLoader = () => string | Promise<string>;

const fetchJson = async <T>(url: string, errorMessage: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
};

const getHelpOutput = () => commandContentToPlainText(getHelpContent());
const getAboutOutput = () => commandContentToPlainText(getAboutContent());
const getContactsOutput = () => commandContentToPlainText(getContactsContent());
const getRepoOutput = () => commandContentToPlainText(getRepoContent());
const getWebsiteOutput = () => commandContentToPlainText(getWebsiteContent());

const getSkillsOutput = async () => {
  const { skills } = await fetchJson<{ skills: ISkill[] }>(
    "/api/skills",
    "Failed to fetch skills"
  );

  return getSkillGroupsContent(skills)
    .map((group) =>
      [
        group.title,
        descriptionItemsToPlainText(group.descriptionItems),
      ].join("\n")
    )
    .join("\n\n");
};

const getStatsOutput = async () => {
  const stats = await fetchJson<StatsData>("/api/stats", "Failed to fetch stats");
  return commandContentToPlainText(getStatsContent(stats));
};

const getAllOutput = async () => {
  const output = await Promise.all(
    redirectedAllCommands.map(async (command) => {
      const text = await getCommandTextOutput(command);

      return `${command}\n${text}`;
    })
  );

  return output.join("\n\n");
};

const commandTextOutputLoaders: Partial<Record<Command, TextOutputLoader>> = {
  [COMMAND_HELP]: getHelpOutput,
  [COMMAND_ABOUT]: getAboutOutput,
  [COMMAND_CONTACTS]: getContactsOutput,
  [COMMAND_REPO]: getRepoOutput,
  [COMMAND_SKILLS]: getSkillsOutput,
  [COMMAND_WEBSITE]: getWebsiteOutput,
  [COMMAND_STATS]: getStatsOutput,
  [UTILITY_COMMAND_ALL]: getAllOutput,
};

export function canRedirectCommand(command: Command): boolean {
  return commandTextOutputLoaders[command] !== undefined;
}

export async function getCommandTextOutput(command: Command): Promise<string> {
  const loader = commandTextOutputLoaders[command];

  if (!loader) {
    throw new Error(`Command '${command}' does not produce redirectable text output.`);
  }

  return loader();
}
