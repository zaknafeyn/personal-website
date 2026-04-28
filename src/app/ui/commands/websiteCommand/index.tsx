import { FC } from 'react';

import { CommandProps } from '../types';
import { getWebsiteContent } from '../content';
import { CommandContentView } from '../contentRenderer';

export const WebsiteCommand: FC<CommandProps> = () => {
  return <CommandContentView content={getWebsiteContent()} />
}
