import { FC } from "react";

import { CommandProps } from "../types";
import { getContactsContent } from "../content";
import { CommandContentView } from "../contentRenderer";

export const ContactsCommand: FC<CommandProps> = () => {
  const content = getContactsContent();

  return <CommandContentView content={content} />
}
