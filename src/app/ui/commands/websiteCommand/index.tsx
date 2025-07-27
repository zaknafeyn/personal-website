import { FC, useEffect } from 'react';

import { Link } from 'app/ui/components/link';
import { Text } from '../../components/text';
import { CommandProps } from '../types';

export const WebsiteCommand: FC<CommandProps> = ({ setCommandFinished }) => {
  
  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

  return (
    <>
      <Text.Paragraph>
        Eventually I created a small site in the Global Network that brings some info about me and where I could present myself.
        I built this using <Text.Terminal textEffect="glow">NextJS</Text.Terminal>, <Text.Terminal textEffect="glow">ReactJS</Text.Terminal> and{" "}
        <Text.Terminal textEffect="glow">TypeScript</Text.Terminal>. The website is inspired by{" "}
        <Link url="https://craigfeldman.com/">
          Craig Feldman&apos;s website
        </Link>{" "}
        and re-written from scratch with enhancements and deeper modularity;
      </Text.Paragraph>

      <Text.Paragraph>
        The source code for this site can be found on my{" "}
        <Link url="https://github.com/zaknafeyn/personal-website">
          GitHub
        </Link>
      </Text.Paragraph>
    </>
  )
}
