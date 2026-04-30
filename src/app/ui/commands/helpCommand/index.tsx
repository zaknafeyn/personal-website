import { FC, useMemo } from "react";
import { DescriptionList } from "app/ui/components/descriptionList";
import { Text } from "app/ui/components/text";
import { commandContentToPlainText, getHelpContent } from "../content";
import { commandHelpEntries } from "../registry";
import type { CommandProps } from "../types";

export const getTextOutput = () => commandContentToPlainText(getHelpContent());

export const HelpCommand: FC<CommandProps> = () => {
  const items = useMemo(
    () =>
      commandHelpEntries.map((command) => ({
        label: command.name,
        values: [command.description],
        isDisabled: !command.enabled,
      })),
    []
  );

  return (
    <div>
      <Text.Paragraph>
        Wow, I thought the only people who would visit this site would be bots
        and spammers, guess I was wrong. Just type any of the commands below to
        get some more info. You can even type a few letters and press [tab] or
        &apos;.&apos; to autocomplete.
      </Text.Paragraph>
      <Text.Paragraph>
        Prefer clickable shortcuts? Try{" "}
        <Text.Terminal>help --links</Text.Terminal>.
      </Text.Paragraph>

      <DescriptionList items={items} />
    </div>
  );
};
