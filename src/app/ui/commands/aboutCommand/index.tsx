import { FC } from "react";

import { getAge } from "app/ui/utils/getAge";
import { Text } from "../../components/text";
import { Link } from "app/ui/components/link";
import { commandContentToPlainText, getAboutContent } from "../content";
import type { CommandProps } from "../types";

export const getTextOutput = () => commandContentToPlainText(getAboutContent());

export const AboutCommand: FC<CommandProps> = () => {
  return (
    <div>
      <Text.Paragraph>
        Hey there! Thanks for taking such a keen interest in me.
      </Text.Paragraph>

      <Text.Paragraph>
        Right, so, where to begin? Well, my parents met in... Nah, just kidding.
        <br />
        As you probably know, my name is{" "}
        <Text.Terminal textEffect="glow" quoted>
          Valentyn Radchuk
        </Text.Terminal>
        . I&apos;m a {getAge(new Date(1984, 1, 16))} year old{" "}
        <Text.Terminal textEffect="glow" quoted>
          Software Engineer
        </Text.Terminal>{" "}
        born and raised in Kyiv, Ukraine.
      </Text.Paragraph>

      <Text.Paragraph>
        I graduated with honors from the <Link url="https://kpi.ua/en/">National Technical University of Ukraine &ldquo;Igor Sikorsky Kyiv Polytechnic Institute&rdquo;</Link> with a
        Master&apos;s degree in Computer Science, specializing in computer systems. The program included
        six years of computer science courses alongside hardware-focused topics such as electrical circuit theory and circuit design.
      </Text.Paragraph>
      <Text.Paragraph>
        My engineering interests include web development, high-load systems, product tooling, and mobile development.
      </Text.Paragraph>
      <Text.Paragraph>
        Away from the keyboard, I like playing guitar, sailing, and hiking.
      </Text.Paragraph>
      <Text.Paragraph>
        I speak Ukrainian (obviously), English, some French, and Russian. Message me in any of these languages; I&apos;d be happy to chat with you.
      </Text.Paragraph>
      <Text.Paragraph>
        Please feel free to get in touch if you&apos;d like to discuss a strong
        engineering opportunity, a useful product idea, or something pleasantly ambitious. My contact details can be found by typing
        &apos;contact&apos;, and if you would like to check out my{" "}
        <Text.Terminal textEffect="glow" quoted>
          CV
        </Text.Terminal>
        , simply type &apos;cv&apos; or click{" "}
        <Link url="CV.pdf" download="Valentyn_Radchuk-Software_Engineer.pdf">
          here
        </Link>
        .
      </Text.Paragraph>
    </div>
  );
};
