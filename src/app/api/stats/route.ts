import { getGFEStats } from "./getGFEStats";
import { getLeetcodeStats, LeetcodeStatsError } from "./getLeetcodeStats";
import type { ISubmissionResults } from "./types";

interface StatsResponse {
  leetcodeStats: ISubmissionResults[];
  gfeStats: ISubmissionResults[];
}

const CACHE_TTL_MS = 60 * 1000;
const LEETCODE_REQUEST_TIMEOUT_MS = 5000;

let cachedStats:
  | {
      expiresAt: number;
      data: StatsResponse;
    }
  | undefined;

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

export async function GET() {
  if (cachedStats && cachedStats.expiresAt > Date.now()) {
    return Response.json(cachedStats.data, {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
      },
    });
  }

  try {
    const leetcodeStatsPromise = getLeetcodeStats(
      process.env.LEETCODE_USERNAME,
      { timeoutMs: LEETCODE_REQUEST_TIMEOUT_MS }
    );

    const gfeStatsPromise = getGFEStats();

    const [leetcodeStats, gfeStats] = await Promise.all([
      leetcodeStatsPromise,
      gfeStatsPromise,
    ]);

    const data = { leetcodeStats, gfeStats };

    cachedStats = {
      data,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
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
