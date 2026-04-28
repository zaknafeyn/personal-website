import { FC, Fragment } from "react";
import { DescriptionItem, DescriptionList } from "app/ui/components/descriptionList";
import { Link } from "app/ui/components/link";
import { Text } from "app/ui/components/text";
import {
  CommandContent,
  CommandDescriptionItem,
  RichTextValue,
} from "./content";
import skillsStyles from "./skillsCommand/skillsCommand.module.css";

export const RichText: FC<{ value: RichTextValue }> = ({ value }) => (
  <>
    {value.map((part, index) => {
      if (typeof part === "string") {
        return <Fragment key={index}>{part}</Fragment>;
      }

      switch (part.type) {
        case "break":
          return <br key={index} />;
        case "link":
          return (
            <Link key={index} url={part.url} download={part.download}>
              {part.text}
            </Link>
          );
        case "terminal":
          return (
            <Text.Terminal key={index} textEffect="glow" quoted={part.quoted}>
              {part.text}
            </Text.Terminal>
          );
        case "skillLevel":
          return (
            <span key={index} className={skillsStyles[`level-${part.level}`]}>
              {"#".repeat(part.level)}
            </span>
          );
      }
    })}
  </>
);

export const toDescriptionListItems = (
  items: CommandDescriptionItem[]
): DescriptionItem[] =>
  items.map((item) => ({
    ...item,
    values: item.values.map((value, index) => (
      <RichText key={index} value={value} />
    )),
  }));

export const CommandContentView: FC<{ content: CommandContent }> = ({ content }) => (
  <>
    {content.paragraphs?.map((paragraph, index) => (
      <Text.Paragraph key={index}>
        <RichText value={paragraph} />
      </Text.Paragraph>
    ))}
    {content.descriptionItems && (
      <DescriptionList items={toDescriptionListItems(content.descriptionItems)} />
    )}
  </>
);
