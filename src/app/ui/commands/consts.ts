import { ComponentType } from "react";
import {
  CvCommand,
  ContactsCommand,
  ClearCommand,
  AllCommand,
  StatsCommand,
  AboutCommand,
  HelpCommand,
  RepoCommand,
  SkillsCommand,
  WebsiteCommand,
  GameCommand,
  ManCommand,
  ProjectsCommand,
  StackCommand,
} from ".";

import {
  COMMAND_ABOUT,
  COMMAND_CONTACTS,
  COMMAND_GAME,
  COMMAND_HELP,
  COMMAND_PROJECTS,
  COMMAND_REPO,
  COMMAND_SKILLS,
  COMMAND_STACK,
  COMMAND_STATS,
  COMMAND_WEBSITE,
  CommandProps,
  EchoCommand,
  UTILITY_COMMAND_ALL,
  UTILITY_COMMAND_CLEAR,
  UTILITY_COMMAND_CV,
  UTILITY_COMMAND_MAN,
  UtilityCommand,
} from "./types";

export const COMMANDS_MAPPING: {
  [key in EchoCommand]: ComponentType<CommandProps>;
} = {
  [COMMAND_HELP]: HelpCommand,
  [COMMAND_ABOUT]: AboutCommand,
  [COMMAND_PROJECTS]: ProjectsCommand,
  [COMMAND_CONTACTS]: ContactsCommand,
  // [COMMAND_AWARDS]: AwardsCommand,
  [COMMAND_REPO]: RepoCommand,
  [COMMAND_SKILLS]: SkillsCommand,
  [COMMAND_WEBSITE]: WebsiteCommand,
  [COMMAND_STACK]: StackCommand,
  [COMMAND_STATS]: StatsCommand,
  [COMMAND_GAME]: GameCommand,
};

export const UTILITY_COMMANDS_MAPPING: {
  [key in UtilityCommand]: ComponentType<CommandProps>;
} = {
  [UTILITY_COMMAND_CV]: CvCommand,
  [UTILITY_COMMAND_ALL]: AllCommand,
  [UTILITY_COMMAND_CLEAR]: ClearCommand,
  [UTILITY_COMMAND_MAN]: ManCommand,
};
