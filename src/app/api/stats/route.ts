import { unstable_cache } from "next/cache";

import { getGFEStats } from "./getGFEStats";
import { getLeetcodeStats, LeetcodeStatsError } from "./getLeetcodeStats";
import type { ISubmissionResults } from "./types";

interface StatsResponse {
  leetcodeStats: ISubmissionResults[];
  gfeStats: ISubmissionResults[];
}

const STATS_CACHE_SECONDS = 60;
const CACHE_CONTROL_HEADER = `public, max-age=${STATS_CACHE_SECONDS}, stale-while-revalidate=30`;
const LEETCODE_REQUEST_TIMEOUT_MS = 5000;

const getErrorStatus = (error: LeetcodeStatsError): number => {
  switch (error.code) {
    case "INVALID_USERNAME":
      return 500;
    case "NOT_FOUND":
      return 404;
    case "TIMEOUT":
      return 504;
    case "UPSTREAM_ERROR":
      return 502;
  }
};

const jsonError = (error: LeetcodeStatsError) =>
  Response.json(
    {
      error: "Failed to load stats",
      message: error.message,
    },
    { status: getErrorStatus(error) }
  );

const getCachedStats = unstable_cache(
  async (leetcodeUsername: string | undefined): Promise<StatsResponse> => {
    const leetcodeStatsPromise = getLeetcodeStats(leetcodeUsername, {
      timeoutMs: LEETCODE_REQUEST_TIMEOUT_MS,
    });

    const gfeStatsPromise = getGFEStats();

    const [leetcodeStats, gfeStats] = await Promise.all([
      leetcodeStatsPromise,
      gfeStatsPromise,
    ]);

    return { leetcodeStats, gfeStats };
  },
  ["stats"],
  { revalidate: STATS_CACHE_SECONDS }
);

export async function GET() {
  try {
    const data = await getCachedStats(process.env.LEETCODE_USERNAME);

    return Response.json(data, {
      headers: {
        "Cache-Control": CACHE_CONTROL_HEADER,
      },
    });
  } catch (error) {
    if (error instanceof LeetcodeStatsError) {
      console.error("Error fetching stats:", error.message);
      return jsonError(error);
    }

    console.error("Unexpected stats API error:", error);

    return Response.json(
      {
        error: "Failed to load stats",
        message: "Unexpected stats API error",
      },
      { status: 500 }
    );
  }
}
