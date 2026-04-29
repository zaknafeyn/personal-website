import { FC } from "react";

import { DescriptionList } from "app/ui/components/descriptionList";
import { Text } from "app/ui/components/text";
import type { CommandProps } from "../types";

export const NowCommand: FC<CommandProps> = () => {
  return (
    <>
      <Text.Paragraph>
        Right now I&apos;m keeping my engineering range deliberately current:
        refreshing fundamentals, following where production AI is going, and
        exploring adjacent tools before they become urgent.
      </Text.Paragraph>

      <DescriptionList
        items={[
          {
            label: "focus",
            values: [
              <>
                Building as a full-stack engineer with a bias for useful
                automation, strong delivery habits, and practical product
                outcomes.
              </>,
              <>
                Turning repeated work routines into custom tools, scripts, and
                small internal applications so teams spend less time on manual
                steps.
              </>,
            ],
          },
          {
            label: "learning",
            values: [
              <>
                Staying sharp with <Text.Terminal>React Native</Text.Terminal>,{" "}
                <Text.Terminal>AI</Text.Terminal>,{" "}
                <Text.Terminal>AI agents</Text.Terminal>,{" "}
                <Text.Terminal>Terraform</Text.Terminal>, and a refreshed pass
                through algorithms and data structures.
              </>,
              <>
                Experimenting with different technologies to understand where
                they are genuinely useful, not just where they are fashionable.
              </>,
            ],
          },
          {
            label: "recent",
            values: [
              <>
                Expanded my profile deeper into full-stack work, infrastructure
                thinking, mobile development, and AI-assisted engineering
                workflows.
              </>,
              <>
                Shipped and explored developer-productivity work, including a
                GitHub CLI add-on and custom applications for reducing routine
                operational work.
              </>,
              <>
                Recently learned how to build{" "}
                <Text.Terminal>VS Code extensions</Text.Terminal> and built one
                to make my everyday workflow smoother.
              </>,
            ],
          },
          {
            label: "available",
            values: [
              <>
                Open to senior/full-stack engineering conversations where the
                work benefits from product sense, automation instincts, and a
                builder who keeps learning.
              </>,
            ],
          },
        ]}
      />
    </>
  );
};
