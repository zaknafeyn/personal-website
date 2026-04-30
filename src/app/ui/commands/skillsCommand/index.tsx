import { FC, Fragment, useMemo } from "react"
import { useSuspenseQuery } from '@tanstack/react-query'; // or your preferred data fetching library

import { ISkill, SKILL_GROUP_NAME, TSkillGroup } from "app/api/skills/types";

import styles from './skillsCommand.module.css';
import { DescriptionList } from "app/ui/components/descriptionList";
import { descriptionItemsToPlainText, getSkillGroupsContent } from "../content";
import type { CommandProps } from "../types";

export const getTextOutput = async () => {
  const response = await fetch("/api/skills");

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  const { skills } = await response.json() as { skills: ISkill[] };

  return getSkillGroupsContent(skills)
    .map((group) =>
      [
        group.title,
        descriptionItemsToPlainText(group.descriptionItems),
      ].join("\n")
    )
    .join("\n\n");
};

export const SkillsCommand: FC<CommandProps> = () => {
  // Using suspense-enabled data fetching
  const { data: skills } = useSuspenseQuery({
    queryKey: ['skills'],
    queryFn: async (): Promise<ISkill[]> => {
      const response = await fetch("/api/skills");
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      const { skills } = await response.json();

      return skills;
    }
  });

  const { aggregatedSkills, groups } = useMemo(() => {
    const aggregatedSkills: Record<string, ISkill[]> = {};
    const groups = new Set<TSkillGroup>();

    for (const skill of skills) {
      const { group } = skill;
      groups.add(group);
      if (!aggregatedSkills[group]) aggregatedSkills[group] = [];
      aggregatedSkills[group].push(skill);
    }

    for (const group in aggregatedSkills) {
      aggregatedSkills[group].sort((a, b) => b.level - a.level);
    }
    return { aggregatedSkills, groups: Array.from(groups) };
  }, [skills]);

  const getListItemsForGroup = (group: string) => {
    return aggregatedSkills[group].map(skill => {
      return {
        label: skill.name,
        values: [
          <>
            ##{" "}
            <span className={styles[`level-${skill.level}`]}>
              {Array(skill.level).fill("#").join("")}
            </span>{" "}
            ##
          </>
        ]
      }
    })
  }

  return (
    <>
      {groups.map(group => {
        return (
          <Fragment key={group}>
            <div className="terminal-heading" key={group}>{SKILL_GROUP_NAME[group]}</div>
            <DescriptionList items={getListItemsForGroup(group)} />
          </Fragment>
        )
      })}
    </>
  )
}
