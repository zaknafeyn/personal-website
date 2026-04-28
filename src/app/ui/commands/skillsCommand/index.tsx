import { FC, Fragment, useMemo } from "react"
import { useSuspenseQuery } from '@tanstack/react-query'; // or your preferred data fetching library

import { ISkill } from "app/api/skills/types";

import { DescriptionList } from "app/ui/components/descriptionList";
import { CommandProps } from "../types";
import { getSkillGroupsContent } from "../content";
import { toDescriptionListItems } from "../contentRenderer";

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

  const groups = useMemo(() => getSkillGroupsContent(skills), [skills]);

  return (
    <>
      {groups.map(({ group, title, descriptionItems }) => {
        return (
          <Fragment key={group}>
            <div className="terminal-heading">{title}</div>
            <DescriptionList items={toDescriptionListItems(descriptionItems)} />
          </Fragment>
        )
      })}
    </>
  )
}
