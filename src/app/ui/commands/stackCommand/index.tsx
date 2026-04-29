import { FC } from "react";

import { DescriptionList } from "app/ui/components/descriptionList";
import { Link } from "app/ui/components/link";
import { Text } from "app/ui/components/text";
import type { CommandProps } from "../types";

const sourceBaseUrl =
  "https://github.com/zaknafeyn/personal-website/blob/main";

const sourceLinks = [
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

export const StackCommand: FC<CommandProps> = () => {
  return (
    <>
      <Text.Paragraph>
        This site is a portfolio disguised as a terminal: a small Next.js
        application where the command line is both the navigation model and a
        signal about how I think as an engineer.
      </Text.Paragraph>

      <DescriptionList
        items={[
          {
            label: "app router",
            values: [
              <>
                The public route is the App Router entry in{" "}
                <Link url={sourceLinks[0].url}>{sourceLinks[0].text}</Link>,
                with shared metadata, font setup, and providers composed from{" "}
                <Link url={sourceLinks[1].url}>{sourceLinks[1].text}</Link>.
              </>,
            ],
          },
          {
            label: "react query",
            values: [
              <>
                Client-side data fetching is centralized in{" "}
                <Link url={sourceLinks[2].url}>{sourceLinks[2].text}</Link>{" "}
                using TanStack Query, streamed hydration, a short stale time,
                retry control, and Suspense-friendly commands.
              </>,
            ],
          },
          {
            label: "command registry",
            values: [
              <>
                Commands are registered in{" "}
                <Link url={sourceLinks[4].url}>{sourceLinks[4].text}</Link>.
                The compatibility types in{" "}
                <Link url={sourceLinks[5].url}>{sourceLinks[5].text}</Link>{" "}
                are derived from that registry.
              </>,
              <>
                The terminal runtime parses input, restores the prompt after
                command completion, handles autocomplete, and wraps command
                output with error boundaries in{" "}
                <Link url={sourceLinks[3].url}>{sourceLinks[3].text}</Link>.
              </>,
            ],
          },
          {
            label: "api routes",
            values: [
              <>
                Route handlers under <Text.Terminal>/api</Text.Terminal> keep
                small dynamic data close to the UI: skills are served from{" "}
                <Link url={sourceLinks[7].url}>{sourceLinks[7].text}</Link>,
                while coding stats use upstream fetches, timeout handling, and
                short-lived caching in{" "}
                <Link url={sourceLinks[8].url}>{sourceLinks[8].text}</Link>.
              </>,
            ],
          },
          {
            label: "deployment",
            values: [
              <>
                The project deploys as a standard Next.js app: static UI,
                server route handlers, metadata, and public assets ship from
                one codebase. The scripts and runtime dependencies are listed
                in <Link url={sourceLinks[9].url}>{sourceLinks[9].text}</Link>.
              </>,
            ],
          },
          {
            label: "toolbox",
            values: [
              <>
                The website itself uses TypeScript, React, Next.js, React
                Query, and Node.js-oriented route handlers.
              </>,
            ],
          },
          {
            label: "tradeoffs",
            values: [
              <>
                The terminal UI is memorable and efficient for technical
                visitors, and it turns portfolio browsing into an interaction
                instead of a scroll. The tradeoff is discoverability, so the
                site leans on <Text.Terminal>help</Text.Terminal>,{" "}
                <Text.Terminal>man</Text.Terminal>, autocomplete, and concise
                command output.
              </>,
              <>
                Keeping the command registry as plain TypeScript makes it easy
                to extend and inspect, with command names, components, help
                text, manuals, all-output membership, completion mode, and
                disabled state living in one typed list.
              </>,
            ],
          },
          {
            label: "source",
            values: [
              <>
                Command metadata lives in{" "}
                <Link url={sourceLinks[4].url}>{sourceLinks[4].text}</Link>,
                and the full repository is available on{" "}
                <Link url="https://github.com/zaknafeyn/personal-website">
                  GitHub
                </Link>.
              </>,
            ],
          },
        ]}
      />
    </>
  );
};
