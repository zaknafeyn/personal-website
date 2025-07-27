import { FC, Suspense, useEffect, useMemo } from "react"
import { CommandProps } from "../types"
import { useSuspenseQuery } from "@tanstack/react-query";
import { ISubmissionResults } from "app/api/stats/types";
import { Text } from "app/ui/components/text";
import { Loading } from "app/ui/components/loading";
import { DescriptionList, DescriptionItem } from "app/ui/components/descriptionList";

interface StatsData {
  gfeStats: ISubmissionResults[],
  leetcodeStats: ISubmissionResults[]
}

const KEY_TITLE_MAPPING: Record<string, string> = {
  gfeStats: "Great Frontend Stats",
  leetcodeStats: "Leetcode Stats"
}

export const StatsContent: FC<CommandProps> = ({ setCommandFinished }) => {

  // Using suspense-enabled data fetching
  const { data: stats } = useSuspenseQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<StatsData> => {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const { leetcodeStats, gfeStats } = await response.json();

      return { leetcodeStats, gfeStats };
    }
  });

  useEffect(() => {
    if (stats) {
      setCommandFinished();
    }
  }, [stats, setCommandFinished]);

  const listItems = useMemo(() => {
    const keys = Object.keys(stats) as (keyof StatsData)[];
    
    const listItems: DescriptionItem[] = [];

    for (const key of keys) {
      listItems.push({
        label: KEY_TITLE_MAPPING[key],
        values: stats[key]
          .map(stat => `${stat.difficulty}: ${stat.count}`)
      })
    }
    
    return listItems
    
  }, [stats])

  return (
    <>
      <Text.Paragraph>Practice, practice, practice ... </Text.Paragraph>
      <Text.Paragraph>Here are my stats on different platforms:</Text.Paragraph>
      <DescriptionList items={listItems}/>
    </>
  )
}

export const StatsCommand: FC<CommandProps> = (props) => (
  <Suspense fallback={<Loading />}>
    <StatsContent {...props} />
  </Suspense>
)
