import { ISubmissionResults } from "./types";

export const getLeetcodeStats = async (
  username: string
): Promise<ISubmissionResults[]> => {
  const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

  const options = {
    method: "get",
    contentType: "application/json",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const result: ISubmissionResults[] = [
      {
        difficulty: "All",
        count: data.totalSolved,
      },
      {
        difficulty: "Easy",
        count: data.easySolved,
      },
      {
        difficulty: "Medium",
        count: data.mediumSolved,
      },
      {
        difficulty: "Hard",
        count: data.hardSolved,
      },
    ];

    return result;
  } catch (error) {
    console.error("Error fetching difficulty:", error);
    return [];
  }
};
