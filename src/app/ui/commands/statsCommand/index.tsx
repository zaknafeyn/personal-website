import { FC, useMemo } from "react"
import { CommandProps } from "../types"
import { useSuspenseQuery } from "@tanstack/react-query";
import { getStatsContent, StatsData } from "../content";
import { CommandContentView } from "../contentRenderer";

export const StatsCommand: FC<CommandProps> = () => {

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

  const content = useMemo(() => getStatsContent(stats), [stats])

  return (
    <CommandContentView content={content} />
  )
}
