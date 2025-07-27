import { FC, useEffect, useMemo } from "react";
import { DescriptionList } from "app/ui/components/descriptionList";
import { Text } from "app/ui/components/text";
import {
  allCommandsArr,
  COMMAND_ABOUT,
  COMMAND_AWARDS,
  COMMAND_CONTACTS,
  COMMAND_PROJECTS,
  COMMAND_REPO,
  COMMAND_SKILLS,
  COMMAND_STATS,
  COMMAND_WEBSITE,
  CommandProps,
  UTILITY_COMMAND_ALL,
  UTILITY_COMMAND_CLEAR,
  UTILITY_COMMAND_CV,
} from "../types";

export const HelpCommand: FC<CommandProps> = ({ setCommandFinished }) => {
  useEffect(() => {
    setCommandFinished();
  }, [setCommandFinished]);

  // todo use record of type - all commands to force enumerating all commands here

  const items = useMemo(
    () => [
      {
        label: COMMAND_ABOUT,
        values: ["Good way to know something about me"],
        isDisabled: !allCommandsArr.includes(COMMAND_ABOUT),
      },
      {
        label: COMMAND_PROJECTS,
        values: ["Yeah, I've made some cool stuff before"],
        isDisabled: !allCommandsArr.includes(COMMAND_PROJECTS),
      },
      {
        label: COMMAND_SKILLS,
        values: ["I'm pretty good at some things"],
        isDisabled: !allCommandsArr.includes(COMMAND_SKILLS),
      },
      {
        label: COMMAND_STATS,
        values: ["See my stats on coding platforms"],
        isDisabled: !allCommandsArr.includes(COMMAND_STATS),
      },
      {
        label: COMMAND_AWARDS,
        values: ["A bit of boasting"],
        isDisabled: !allCommandsArr.includes(COMMAND_AWARDS),
      },
      {
        label: COMMAND_REPO,
        values: ["Take a look at some of my work"],
        isDisabled: !allCommandsArr.includes(COMMAND_REPO),
      },
      {
        label: UTILITY_COMMAND_CV,
        values: ["Check out my CV [pdf - 132KB]"],
        isDisabled: !allCommandsArr.includes(UTILITY_COMMAND_CV),
      },
      {
        label: COMMAND_CONTACTS,
        values: ["Let's keep in touch"],
        isDisabled: !allCommandsArr.includes(COMMAND_CONTACTS),
      },
      {
        label: COMMAND_WEBSITE,
        values: ["How I built this"],
        isDisabled: !allCommandsArr.includes(COMMAND_WEBSITE),
      },
      {
        label: UTILITY_COMMAND_ALL,
        values: ["Tell me everything"],
        isDisabled: !allCommandsArr.includes(UTILITY_COMMAND_ALL),
      },
      {
        label: UTILITY_COMMAND_CLEAR,
        values: ["Clears the terminal of all output"],
        isDisabled: !allCommandsArr.includes(UTILITY_COMMAND_CLEAR),
      },
    ],
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

      <DescriptionList items={items} />
    </div>
  );
};
