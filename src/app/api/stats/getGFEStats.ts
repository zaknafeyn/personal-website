import { ISubmissionResults } from "./types";

export const getGFEStats = async (): Promise<ISubmissionResults[]> => {
  const result: ISubmissionResults[] = [
    {
      difficulty: "All",
      count: 74,
    },
    {
      difficulty: "Easy",
      count: 38,
    },
    {
      difficulty: "Medium",
      count: 36,
    },
    {
      difficulty: "Hard",
      count: 0,
    },
  ];

  return result;
};
