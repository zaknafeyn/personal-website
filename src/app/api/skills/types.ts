export type TSkillGroup =
  | "language"
  | "tool"
  | "framework"
  | "database"
  | "cloud"
  | "other";

export interface ISkill {
  name: string;
  level: number;
  group: TSkillGroup;
  isDetailed?: boolean;
}

export const SKILL_GROUP_NAME: Record<TSkillGroup, string> = {
  language: "Languages",
  tool: "Tools",
  framework: "Frameworks",
  database: "Databases",
  cloud: "Cloud and infrastructure",
  other: "Others",
};
