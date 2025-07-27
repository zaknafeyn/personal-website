import { FC, Fragment, Suspense, useEffect, useMemo, useState } from "react"
import { useSuspenseQuery } from '@tanstack/react-query'; // or your preferred data fetching library

import { ISkill, SKILL_GROUP_NAME, TSkillGroup } from "app/api/skills/types";

import styles from './skillsCommand.module.css';
import { DescriptionList } from "app/ui/components/descriptionList";
import { Loading } from "app/ui/components/loading";
import { CommandProps } from "../types";

const SkillsContent: FC<CommandProps> = ({ setCommandFinished }) => {
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

  useEffect(() => {
    if (skills && skills.length > 0) {
      setCommandFinished();
    }
  }, [skills, setCommandFinished]);
  

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

export const SkillsCommand: FC<CommandProps> = (props) => (
  <Suspense fallback={<Loading />}>
    <SkillsContent {...props} />
  </Suspense>
)

export const SkillsCommand1 = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    
    const fetchSkills = async () => { 
      const response = await fetch("/api/skills");
      const { skills } = await response.json();
      setSkills(skills);
    }
    
    fetchSkills();
  }, []);

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
              {Array(skill.level).fill("#").join("") }
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
            <DescriptionList items={getListItemsForGroup(group)}/>
          </Fragment>
        )
      })}
    </>
  )
}
