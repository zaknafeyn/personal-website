import { getGFEStats } from "./getGFEStats";
import { getLeetcodeStats } from "./getLeetcodeStats";

export async function GET() {
  const leetcodeStatsPromise = getLeetcodeStats(
    process.env.LEETCODE_USERNAME as string
  );

  const gfeStatsPromise = getGFEStats();

  const [leetcodeStats, gfeStats] = await Promise.all([
    leetcodeStatsPromise,
    gfeStatsPromise,
  ]);

  return Response.json({ leetcodeStats, gfeStats });
}
