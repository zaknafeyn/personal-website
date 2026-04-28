import { ISubmissionResults, TDifficulty } from "./types";

interface LeetcodeSubmissionCount {
  difficulty: TDifficulty;
  count: number;
}

interface LeetcodeStatsResponse {
  data?: {
    matchedUser?: {
      submitStats?: {
        acSubmissionNum?: LeetcodeSubmissionCount[];
      };
    } | null;
  };
  errors?: unknown[];
}

export type LeetcodeStatsErrorCode =
  | "INVALID_USERNAME"
  | "TIMEOUT"
  | "UPSTREAM_ERROR"
  | "NOT_FOUND";

export class LeetcodeStatsError extends Error {
  constructor(
    message: string,
    public readonly code: LeetcodeStatsErrorCode
  ) {
    super(message);
    this.name = "LeetcodeStatsError";
  }
}

interface GetLeetcodeStatsOptions {
  timeoutMs?: number;
}

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
const DEFAULT_TIMEOUT_MS = 5000;
const USERNAME_PATTERN = /^[A-Za-z0-9_-]{3,30}$/;

const LEETCODE_STATS_QUERY = `
  query getLeetcodeStats($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

const DIFFICULTIES: TDifficulty[] = ["All", "Easy", "Medium", "Hard"];

const normalizeUsername = (username: string): string => username.trim();

export const validateLeetcodeUsername = (username?: string): string => {
  if (!username) {
    throw new LeetcodeStatsError(
      "LEETCODE_USERNAME is not configured",
      "INVALID_USERNAME"
    );
  }

  const normalizedUsername = normalizeUsername(username);

  if (!USERNAME_PATTERN.test(normalizedUsername)) {
    throw new LeetcodeStatsError(
      "LEETCODE_USERNAME must be 3-30 characters and contain only letters, numbers, underscores, or hyphens",
      "INVALID_USERNAME"
    );
  }

  return normalizedUsername;
};

const isAbortError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  error.name === "AbortError";

export const getLeetcodeStats = async (
  username: string | undefined,
  { timeoutMs = DEFAULT_TIMEOUT_MS }: GetLeetcodeStatsOptions = {}
): Promise<ISubmissionResults[]> => {
  const validatedUsername = validateLeetcodeUsername(username);
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${validatedUsername}/`,
      },
      signal: abortController.signal,
      body: JSON.stringify({
        query: LEETCODE_STATS_QUERY,
        variables: { username: validatedUsername },
      }),
    });

    if (!response.ok) {
      throw new LeetcodeStatsError(
        `Leetcode API responded with ${response.status}`,
        "UPSTREAM_ERROR"
      );
    }

    const data = (await response.json()) as LeetcodeStatsResponse;

    if (data.errors?.length) {
      throw new LeetcodeStatsError(
        "Leetcode API returned GraphQL errors",
        "UPSTREAM_ERROR"
      );
    }

    const submissionCounts =
      data.data?.matchedUser?.submitStats?.acSubmissionNum;

    if (!submissionCounts) {
      throw new LeetcodeStatsError(
        `Leetcode user "${validatedUsername}" was not found`,
        "NOT_FOUND"
      );
    }

    const countsByDifficulty = submissionCounts.reduce(
      (counts, { difficulty, count }) => {
        counts[difficulty] = count;
        return counts;
      },
      {} as Record<TDifficulty, number>
    );

    const result: ISubmissionResults[] = DIFFICULTIES.map((difficulty) => ({
      difficulty,
      count: countsByDifficulty[difficulty] ?? 0,
    }));

    return result;
  } catch (error) {
    if (error instanceof LeetcodeStatsError) {
      throw error;
    }

    if (isAbortError(error)) {
      throw new LeetcodeStatsError(
        `Leetcode API request timed out after ${timeoutMs}ms`,
        "TIMEOUT"
      );
    }

    throw new LeetcodeStatsError(
      "Leetcode API request failed",
      "UPSTREAM_ERROR"
    );
  } finally {
    clearTimeout(timeout);
  }
};
