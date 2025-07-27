// todo add prompt depending on os: mac/win/linux
"use client";

import { FC, useEffect, useState } from "react";

import styles from "./prompt.module.css"

import { Text } from "../text";

import { getOs } from "app/ui/utils/getOs"

interface PromptProps {
  currentPath?: string;
  promptString?: string;
}

export const Prompt:FC<PromptProps> = ({currentPath = "~", promptString=">"}, ) => {

  const [os, setOs] = useState<string | null>(null);

  useEffect(() => { 
    setOs(getOs());
  }, [])

  return (
    <div className={styles.promptContainer}>
      <Text.Terminal>{ os }</Text.Terminal>
      <Text.Terminal>{ currentPath }</Text.Terminal>
      <Text.Terminal>{promptString}</Text.Terminal>
    </div>
  )
}
