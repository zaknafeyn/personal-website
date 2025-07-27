import { pause } from "app/ui/utils/pause";
import { ISkill } from "./types";

export async function GET() {
  const skills: ISkill[] = [
    // languages
    {
      name: "TypeScript",
      level: 8,
      group: "language",
    },
    {
      name: "JavaScript",
      level: 10,
      group: "language",
    },
    {
      name: "C#",
      level: 7,
      group: "language",
    },
    {
      name: "SQL",
      level: 6,
      group: "language",
    },
    {
      name: "Go",
      level: 4,
      group: "language",
    },
    // frameworks
    {
      name: "React",
      level: 9,
      group: "framework",
    },
    {
      name: "React-native",
      level: 6,
      group: "framework",
    },
    {
      name: "Angular",
      level: 4,
      group: "framework",
    },
    // clouds
    {
      name: "AWS",
      level: 5,
      group: "cloud",
    },
    {
      name: "Azure",
      level: 4,
      group: "cloud",
    },
    // databases
    {
      name: "MS SQL",
      level: 5,
      group: "database",
    },
    {
      name: "PostgreSQL",
      level: 5,
      group: "database",
    },
  ];

  await pause();
  return Response.json({
    skills,
  });
}
