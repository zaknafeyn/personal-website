import { FC, useEffect } from "react";

import { CommandProps } from "../types";
import { Text } from "app/ui/components/text";
import { Link } from "app/ui/components/link";

export const ProjectsCommand: FC<CommandProps> = ({ setCommandFinished }) => {

  // todo update this file and fill the content
  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);
  
  return (
    <>
      <Text.Paragraph>
        I&apos;m always working on comp sciey (not really a word) things. Why don&apos;t
        you check out a few of my public code repositories? Just type &apos;repo&apos;
        to get the links.
      </Text.Paragraph>
      <Text.Paragraph>
        I&apos;ve also dabbled in producing a{" "}
        <Link url="https://example.com">
          property-management portal
        </Link>{" "}
        that provides property managers and buildings with some really cool
        software and tools. The project uses TypeScript, Node.js, React (with
        Material-UI components) and Firebase.
      </Text.Paragraph>
    </>
  )
}
