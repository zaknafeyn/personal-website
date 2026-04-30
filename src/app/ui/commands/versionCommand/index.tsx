import { FC } from "react";

import { Text } from "app/ui/components/text";
import type { CommandProps } from "../types";

const version = process.env.NEXT_PUBLIC_APP_VERSION ?? "unknown+unknown+unknown";

export const getTextOutput = () => version;

export const VersionCommand: FC<CommandProps> = () => {
  return <Text.Terminal>{version}</Text.Terminal>;
};
