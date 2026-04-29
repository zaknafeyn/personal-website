import { FC } from 'react';

import { Link } from 'app/ui/components/link';
import { Text } from '../../components/text';
import type { CommandProps } from '../types';

export const WebsiteCommand: FC<CommandProps> = () => {
  return (
    <>
      <Text.Paragraph>
        I wanted a small corner of the web that feels more like a terminal than a business card: playful, direct, and useful.
        I built it with <Text.Terminal textEffect="glow">Next.js</Text.Terminal>, <Text.Terminal textEffect="glow">React</Text.Terminal>, and{" "}
        <Text.Terminal textEffect="glow">TypeScript</Text.Terminal>. It was inspired by{" "}
        <Link url="https://craigfeldman.com/">
          Craig Feldman&apos;s website
        </Link>{" "}
        and rebuilt from scratch with a modular command system, typed UI pieces, and a few extra tricks of my own.
      </Text.Paragraph>

      <Text.Paragraph>
        The source code for this site is available on{" "}
        <Link url="https://github.com/zaknafeyn/personal-website">
          GitHub
        </Link>
      </Text.Paragraph>
    </>
  )
}
