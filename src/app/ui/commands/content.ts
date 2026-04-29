import { ISkill, SKILL_GROUP_NAME, TSkillGroup } from "app/api/skills/types";
import { ISubmissionResults } from "app/api/stats/types";
import { getAge } from "app/ui/utils/getAge";
import { commandHelpEntries } from "./registry";

export type RichTextPart =
  | string
  | {
      type: "break";
    }
  | {
      type: "link";
      text: string;
      url: string;
      download?: string;
      plainText?: string;
    }
  | {
      type: "terminal";
      text: string;
      quoted?: boolean;
    }
  | {
      type: "skillLevel";
      level: number;
    };

export type RichTextValue = RichTextPart[];

export type CommandDescriptionItem = {
  label: string;
  values: RichTextValue[];
  isDisabled?: boolean;
};

export type CommandContent = {
  paragraphs?: RichTextValue[];
  descriptionItems?: CommandDescriptionItem[];
};

export interface StatsData {
  gfeStats: ISubmissionResults[];
  leetcodeStats: ISubmissionResults[];
}

export type SkillGroupContent = {
  group: TSkillGroup;
  title: string;
  descriptionItems: CommandDescriptionItem[];
};

export const STATS_KEY_TITLE_MAPPING: Record<keyof StatsData, string> = {
  gfeStats: "Great Frontend Stats",
  leetcodeStats: "Leetcode Stats",
};

export const text = (...parts: RichTextPart[]): RichTextValue => parts;

export const getHelpContent = (): CommandContent => ({
  paragraphs: [
    text(
      "Wow, I thought the only people who would visit this site would be bots and spammers, guess I was wrong. Just type any of the commands below to get some more info. You can even type a few letters and press [tab] or '.' to autocomplete."
    ),
  ],
  descriptionItems: commandHelpEntries.map((command) => ({
    label: command.name,
    values: [text(command.description)],
    isDisabled: !command.enabled,
  })),
});

export const getAboutContent = (): CommandContent => ({
  paragraphs: [
    text("Hey there! Thanks for taking such a keen interest in me. "),
    text(
      "Right, so, where to begin? Well, my parents met in... Nah, just kidding.",
      { type: "break" },
      "As you probably know, my name is ",
      { type: "terminal", text: "Valentyn Radchuk", quoted: true },
      `. I'm a ${getAge(new Date(1984, 1, 16))} year old `,
      { type: "terminal", text: "Software Engineer", quoted: true },
      " born and grew in the beautiful Ukraine, in Kyiv."
    ),
    text(
      "I graduated with honour from the ",
      {
        type: "link",
        text: "National Technical University of Ukraine \"Igor Sikorsky Kyiv Polytechnic Institute\"",
        url: "https://kpi.ua/en/",
      },
      " with a Master of Specialized Computer Systems degree in Computer Science. It comprised of six years of computer science courses, as well as many hardware courses like theory of electric chains, circuit engineering etc."
    ),
    text("Some of my interests include: web development, high load systems and mobile development."),
    text("Some of my hobbies include: playing the guitar, sailing and hiking."),
    text("I speak Ukrainian (obviously), English, some French and russian. Message me in any of these languages, I would be happy to chat with you."),
    text(
      "Please feel free to get in touch with me to discuss any cool opportunities. My contact details can be found by typing 'contact', and if you would like to check out my ",
      { type: "terminal", text: "CV", quoted: true },
      ", simply type 'cv' or click ",
      {
        type: "link",
        text: "here",
        url: "CV.pdf",
        download: "Valentyn_Radchuk-Software_Engineer.pdf",
        plainText: "here: CV.pdf",
      },
      "."
    ),
  ],
});

export const getContactsContent = (): CommandContent => ({
  descriptionItems: [
    {
      label: "Email",
      values: [
        text({
          type: "link",
          text: "zaknafeyn@gmail.com",
          url: "mailto:zaknafeyn@gmail.com",
          plainText: "zaknafeyn@gmail.com",
        }),
      ],
    },
    {
      label: "Social networks",
      values: [
        text({
          type: "link",
          text: "Github",
          url: "https://github.com/zaknafeyn",
        }),
        text({
          type: "link",
          text: "LinkedIn",
          url: "https://www.linkedin.com/in/valentineradchuk/",
        }),
      ],
    },
  ],
});

export const getRepoContent = (): CommandContent => ({
  paragraphs: [
    text(
      "Here is my ",
      { type: "link", text: "GitHub", url: "https://github.com/zaknafeyn" },
      " "
    ),
    text("Unfortunately, I could only make a small subset of my projects public. Most of my contributions done into private repos, at least you could see my activity and some stats."),
    text(
      "You could try my vscode extension ",
      {
        type: "link",
        text: "Git Smart Checkout",
        url: "https://github.com/zaknafeyn/git-smart-checkout",
      },
      " that does auto stash when switching a branch"
    ),
    text(
      "Review ",
      {
        type: "link",
        text: "source code",
        url: "https://github.com/zaknafeyn/personal-website",
      },
      " of this website"
    ),
  ],
});

export const getWebsiteContent = (): CommandContent => ({
  paragraphs: [
    text(
      "Eventually I created a small site in the Global Network that brings some info about me and where I could present myself. I built this using ",
      { type: "terminal", text: "NextJS" },
      ", ",
      { type: "terminal", text: "ReactJS" },
      " and ",
      { type: "terminal", text: "TypeScript" },
      ". The website is inspired by ",
      {
        type: "link",
        text: "Craig Feldman's website",
        url: "https://craigfeldman.com/",
      },
      " and re-written from scratch with enhancements and deeper modularity;"
    ),
    text(
      "The source code for this site can be found on my ",
      {
        type: "link",
        text: "GitHub",
        url: "https://github.com/zaknafeyn/personal-website",
      }
    ),
  ],
});

export const getStatsContent = (stats: StatsData): CommandContent => {
  const keys = Object.keys(stats) as (keyof StatsData)[];

  return {
    paragraphs: [
      text("Practice, practice, practice ... "),
      text("Here are my stats on different platforms:"),
    ],
    descriptionItems: keys.map((key) => ({
      label: STATS_KEY_TITLE_MAPPING[key],
      values: stats[key].map((stat) => text(`${stat.difficulty}: ${stat.count}`)),
    })),
  };
};

export const getSkillGroupsContent = (skills: ISkill[]): SkillGroupContent[] => {
  const aggregatedSkills: Record<string, ISkill[]> = {};
  const groups = new Set<TSkillGroup>();

  for (const skill of skills) {
    groups.add(skill.group);
    aggregatedSkills[skill.group] ??= [];
    aggregatedSkills[skill.group].push(skill);
  }

  for (const group in aggregatedSkills) {
    aggregatedSkills[group].sort((a, b) => b.level - a.level);
  }

  return Array.from(groups).map((group) => ({
    group,
    title: SKILL_GROUP_NAME[group],
    descriptionItems: aggregatedSkills[group].map((skill) => ({
      label: skill.name,
      values: [text("## ", { type: "skillLevel", level: skill.level }, " ##")],
    })),
  }));
};

const linkToPlainText = (part: Extract<RichTextPart, { type: "link" }>) => {
  if (part.plainText) return part.plainText;
  if (part.text === part.url) return part.url;

  return `${part.text}: ${part.url}`;
};

export const richTextToPlainText = (value: RichTextValue) =>
  value
    .map((part) => {
      if (typeof part === "string") return part;

      switch (part.type) {
        case "break":
          return "\n";
        case "link":
          return linkToPlainText(part);
        case "terminal":
          return part.quoted ? `"${part.text}"` : part.text;
        case "skillLevel":
          return "#".repeat(part.level);
      }
    })
    .join("");

export const descriptionItemsToPlainText = (items: CommandDescriptionItem[]) =>
  items
    .filter((item) => !item.isDisabled)
    .map((item) =>
      `${item.label}\n${item.values.map((value) => `  ${richTextToPlainText(value)}`).join("\n")}`
    )
    .join("\n\n");

export const commandContentToPlainText = (content: CommandContent) => {
  const parts = [
    ...(content.paragraphs?.map(richTextToPlainText) ?? []),
    ...(content.descriptionItems ? [descriptionItemsToPlainText(content.descriptionItems)] : []),
  ].filter(Boolean);

  return parts.join("\n\n");
};
