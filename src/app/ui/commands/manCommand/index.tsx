import { FC } from "react";

import { DescriptionList } from "app/ui/components/descriptionList";
import { Text } from "app/ui/components/text";
import { getClosestCommand } from "app/ui/components/terminal/utils";
import { COMMAND_MANUALS } from "../commandManuals";
import { CommandProps } from "../types";

export const ManCommand: FC<CommandProps> = ({ params = [] }) => {
  const requestedCommand = params[0];

  if (!requestedCommand) {
    return (
      <div>
        <Text.Paragraph>What manual page do you want?</Text.Paragraph>
        <Text.Terminal>Usage: man &lt;command&gt;</Text.Terminal>
      </div>
    );
  }

  const manual = COMMAND_MANUALS[requestedCommand];

  if (!manual) {
    const suggestion = getClosestCommand(requestedCommand);

    return (
      <div>
        <Text.Terminal>{`No manual entry for ${requestedCommand}.`}</Text.Terminal>
        {suggestion && <Text.Paragraph>{`Try 'man ${suggestion}' instead.`}</Text.Paragraph>}
      </div>
    );
  }

  return (
    <div>
      <Text.SubHeader>NAME</Text.SubHeader>
      <DescriptionList
        items={[
          {
            label: manual.name,
            values: [manual.description],
          },
        ]}
      />

      <Text.SubHeader>SYNOPSIS</Text.SubHeader>
      <Text.Paragraph>
        <Text.Terminal>{manual.synopsis}</Text.Terminal>
      </Text.Paragraph>

      {manual.arguments && (
        <>
          <Text.SubHeader>ARGUMENTS</Text.SubHeader>
          <DescriptionList
            items={manual.arguments.map((argument) => {
              const [label, ...description] = argument.split(/\s{2,}/);

              return {
                label,
                values: [description.join(" ")],
              };
            })}
          />
        </>
      )}

      {manual.options && (
        <>
          <Text.SubHeader>OPTIONS</Text.SubHeader>
          <DescriptionList
            items={manual.options.map((option) => {
              const [label, ...description] = option.split(/\s{2,}/);

              return {
                label,
                values: [description.join(" ")],
              };
            })}
          />
        </>
      )}

      {manual.notes && (
        <>
          <Text.SubHeader>NOTES</Text.SubHeader>
          <DescriptionList
            items={manual.notes.map((note) => ({
              label: "*",
              values: [note],
            }))}
          />
        </>
      )}
    </div>
  );
};
