export type TDifficulty = "All" | "Easy" | "Medium" | "Hard";

export interface ISubmissionResults {
  difficulty: TDifficulty;
  count: number;
}
