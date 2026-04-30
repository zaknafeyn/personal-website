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
    text(
      "Prefer clickable shortcuts? Try ",
      { type: "terminal", text: "help --links" },
      "."
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
      " born and raised in Kyiv, Ukraine."
    ),
    text(
      "I graduated with honors from the ",
      {
        type: "link",
        text: "National Technical University of Ukraine \"Igor Sikorsky Kyiv Polytechnic Institute\"",
        url: "https://kpi.ua/en/",
      },
      " with a Master's degree in Computer Science, specializing in computer systems. The program included six years of computer science courses alongside hardware-focused topics such as electrical circuit theory and circuit design."
    ),
    text(
      "My engineering interests include web development, high-load systems, product tooling, and mobile development."
    ),
    text(
      "Away from the keyboard, I like playing guitar, sailing, and hiking."
    ),
    text(
      "I speak Ukrainian (obviously), English, some French, and russian. Message me in any of these languages; I'd be happy to chat with you."
    ),
    text(
      "Please feel free to get in touch if you'd like to discuss a strong engineering opportunity, a useful product idea, or something pleasantly ambitious. My contact details can be found by typing 'contact', and if you would like to check out my ",
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
      " profile."
    ),
    text(
      "A lot of my professional work lives in private repositories, so the public set is only part of the story. Still, you can see my activity, open-source work, and a few useful artifacts from the engineering trail."
    ),
    text(
      "You can try my VS Code extension, ",
      {
        type: "link",
        text: "Git Smart Checkout",
        url: "https://github.com/zaknafeyn/git-smart-checkout",
      },
      ", which automatically stashes local changes when switching branches."
    ),
    text(
      "You can also browse the ",
      {
        type: "link",
        text: "source code",
        url: "https://github.com/zaknafeyn/personal-website",
      },
      " for this website."
    ),
  ],
});

export const getNowContent = (): CommandContent => ({
  paragraphs: [
    text(
      "Right now I'm keeping my engineering range deliberately current: refreshing fundamentals, following where production AI is going, and exploring adjacent tools before they become urgent."
    ),
  ],
  descriptionItems: [
    {
      label: "focus",
      values: [
        text(
          "Building as a full-stack engineer with a bias for useful automation, strong delivery habits, and practical product outcomes."
        ),
        text(
          "Turning repeated work routines into custom tools, scripts, and small internal applications so teams spend less time on manual steps."
        ),
      ],
    },
    {
      label: "learning",
      values: [
        text(
          "Staying sharp with ",
          { type: "terminal", text: "React Native" },
          ", ",
          { type: "terminal", text: "AI" },
          ", ",
          { type: "terminal", text: "AI agents" },
          ", ",
          { type: "terminal", text: "Terraform" },
          ", and a refreshed pass through algorithms and data structures."
        ),
        text(
          "Experimenting with different technologies to understand where they are genuinely useful, not just where they are fashionable."
        ),
      ],
    },
    {
      label: "recent",
      values: [
        text(
          "Expanded my profile deeper into full-stack work, infrastructure thinking, mobile development, and AI-assisted engineering workflows."
        ),
        text(
          "Shipped and explored developer-productivity work, including a GitHub CLI add-on and custom applications for reducing routine operational work."
        ),
        text(
          "Recently learned how to build ",
          { type: "terminal", text: "VS Code extensions" },
          " and built one to make my everyday workflow smoother."
        ),
      ],
    },
    {
      label: "available",
      values: [
        text(
          "Open to senior/full-stack engineering conversations where the work benefits from product sense, automation instincts, and a builder who keeps learning."
        ),
      ],
    },
  ],
});

const sourceBaseUrl =
  "https://github.com/zaknafeyn/personal-website/blob/main";

const stackSourceLinks = [
  {
    label: "app",
    url: `${sourceBaseUrl}/src/app/page.tsx`,
    text: "src/app/page.tsx",
  },
  {
    label: "layout",
    url: `${sourceBaseUrl}/src/app/layout.tsx`,
    text: "src/app/layout.tsx",
  },
  {
    label: "providers",
    url: `${sourceBaseUrl}/src/app/providers.tsx`,
    text: "src/app/providers.tsx",
  },
  {
    label: "terminal",
    url: `${sourceBaseUrl}/src/app/ui/components/terminal/index.tsx`,
    text: "src/app/ui/components/terminal/index.tsx",
  },
  {
    label: "registry",
    url: `${sourceBaseUrl}/src/app/ui/commands/registry.ts`,
    text: "src/app/ui/commands/registry.ts",
  },
  {
    label: "types",
    url: `${sourceBaseUrl}/src/app/ui/commands/types.ts`,
    text: "src/app/ui/commands/types.ts",
  },
  {
    label: "manuals",
    url: `${sourceBaseUrl}/src/app/ui/commands/commandManuals.ts`,
    text: "src/app/ui/commands/commandManuals.ts",
  },
  {
    label: "skills api",
    url: `${sourceBaseUrl}/src/app/api/skills/route.ts`,
    text: "src/app/api/skills/route.ts",
  },
  {
    label: "stats api",
    url: `${sourceBaseUrl}/src/app/api/stats/route.ts`,
    text: "src/app/api/stats/route.ts",
  },
  {
    label: "package",
    url: `${sourceBaseUrl}/package.json`,
    text: "package.json",
  },
] as const;

export const getStackContent = (): CommandContent => ({
  paragraphs: [
    text(
      "This site is a portfolio disguised as a terminal: a small Next.js application where the command line is both the navigation model and a signal about how I think as an engineer."
    ),
  ],
  descriptionItems: [
    {
      label: "app router",
      values: [
        text(
          "The public route is the App Router entry in ",
          { type: "link", text: stackSourceLinks[0].text, url: stackSourceLinks[0].url },
          ", with shared metadata, font setup, and providers composed from ",
          { type: "link", text: stackSourceLinks[1].text, url: stackSourceLinks[1].url },
          "."
        ),
      ],
    },
    {
      label: "react query",
      values: [
        text(
          "Client-side data fetching is centralized in ",
          { type: "link", text: stackSourceLinks[2].text, url: stackSourceLinks[2].url },
          " using TanStack Query, streamed hydration, a short stale time, retry control, and Suspense-friendly commands."
        ),
      ],
    },
    {
      label: "command registry",
      values: [
        text(
          "Commands are registered in ",
          { type: "link", text: stackSourceLinks[4].text, url: stackSourceLinks[4].url },
          ". The compatibility types in ",
          { type: "link", text: stackSourceLinks[5].text, url: stackSourceLinks[5].url },
          " are derived from that registry."
        ),
        text(
          "The terminal runtime parses input, restores the prompt after command completion, handles autocomplete, and wraps command output with error boundaries in ",
          { type: "link", text: stackSourceLinks[3].text, url: stackSourceLinks[3].url },
          "."
        ),
      ],
    },
    {
      label: "api routes",
      values: [
        text(
          "Route handlers under ",
          { type: "terminal", text: "/api" },
          " keep small dynamic data close to the UI: skills are served from ",
          { type: "link", text: stackSourceLinks[7].text, url: stackSourceLinks[7].url },
          ", while coding stats use upstream fetches, timeout handling, and short-lived caching in ",
          { type: "link", text: stackSourceLinks[8].text, url: stackSourceLinks[8].url },
          "."
        ),
      ],
    },
    {
      label: "deployment",
      values: [
        text(
          "The project deploys as a standard Next.js app: static UI, server route handlers, metadata, and public assets ship from one codebase. The scripts and runtime dependencies are listed in ",
          { type: "link", text: stackSourceLinks[9].text, url: stackSourceLinks[9].url },
          "."
        ),
      ],
    },
    {
      label: "toolbox",
      values: [
        text(
          "The website itself uses TypeScript, React, Next.js, React Query, and Node.js-oriented route handlers."
        ),
      ],
    },
    {
      label: "tradeoffs",
      values: [
        text(
          "The terminal UI is memorable and efficient for technical visitors, and it turns portfolio browsing into an interaction instead of a scroll. The tradeoff is discoverability, so the site leans on ",
          { type: "terminal", text: "help" },
          ", ",
          { type: "terminal", text: "man" },
          ", autocomplete, and concise command output."
        ),
        text(
          "Keeping the command registry as plain TypeScript makes it easy to extend and inspect, with command names, components, help text, manuals, all-output membership, completion mode, and disabled state living in one typed list."
        ),
      ],
    },
    {
      label: "source",
      values: [
        text(
          "Command metadata lives in ",
          { type: "link", text: stackSourceLinks[4].text, url: stackSourceLinks[4].url },
          ", and the full repository is available on ",
          {
            type: "link",
            text: "GitHub",
            url: "https://github.com/zaknafeyn/personal-website",
          },
          "."
        ),
      ],
    },
  ],
});

export const getWebsiteContent = (): CommandContent => ({
  paragraphs: [
    text(
      "I wanted a small corner of the web that feels more like a terminal than a business card: playful, direct, and useful. I built it with ",
      { type: "terminal", text: "Next.js" },
      ", ",
      { type: "terminal", text: "React" },
      ", and ",
      { type: "terminal", text: "TypeScript" },
      ". It was inspired by ",
      {
        type: "link",
        text: "Craig Feldman's website",
        url: "https://craigfeldman.com/",
      },
      " and rebuilt from scratch with a modular command system, typed UI pieces, and a few extra tricks of my own."
    ),
    text(
      "The source code for this site is available on ",
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
