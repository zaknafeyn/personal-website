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
      isDetailed: true,
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
      name: "NodeJS",
      level: 7,
      group: "framework",
    },
    {
      name: "Angular",
      level: 4,
      group: "framework",
      isDetailed: true,
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

  await pause(3000);
  return Response.json({
    skills,
  });
}
