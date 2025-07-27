import { FC, useEffect } from "react";

import { getAge } from "app/ui/utils/getAge";
import { Text } from "../../components/text";
import { Link } from "app/ui/components/link";
import { CommandProps } from "../types";

export const AboutCommand: FC<CommandProps> = ({ setCommandFinished }) => {

  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

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
        born and grew in the beautiful Ukraine, in Kyiv.
      </Text.Paragraph>

      <Text.Paragraph>
        I graduated with honour from the <Link url="https://kpi.ua/en/">National Technical University of Ukraine &ldquo;Igor Sikorsky Kyiv Polytechnic Institute&ldquo;</Link> with a
        Master of Specialized Computer Systems degree in Computer Science. It comprised of
        six years of computer science courses, as well as many hardware courses like theory of electric chains, circuit engineering etc.
      </Text.Paragraph>
      <Text.Paragraph>
        Some of my interests include: web development, high load systems and mobile development.
      </Text.Paragraph>
      <Text.Paragraph>
        Some of my hobbies include: playing the guitar, sailing and hiking.
      </Text.Paragraph>
      <Text.Paragraph>
        I speak Ukrainian (obviously), English, some French and russian. Message me in any of these languages, I would be happy to chat with you.
      </Text.Paragraph>
      <Text.Paragraph>
        Please feel free to get in touch with me to discuss any cool
        opportunities. My contact details can be found by typing
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
