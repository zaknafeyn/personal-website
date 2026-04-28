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

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

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

export const getLeetcodeStats = async (
  username: string
): Promise<ISubmissionResults[]> => {
  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${username}/`,
      },
      body: JSON.stringify({
        query: LEETCODE_STATS_QUERY,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`Leetcode API responded with ${response.status}`);
    }

    const data = (await response.json()) as LeetcodeStatsResponse;

    if (data.errors?.length) {
      throw new Error("Leetcode API returned GraphQL errors");
    }

    const submissionCounts =
      data.data?.matchedUser?.submitStats?.acSubmissionNum;

    if (!submissionCounts) {
      throw new Error(`Leetcode user "${username}" was not found`);
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
    console.error("Error fetching difficulty:", error);
    return [];
  }
};
