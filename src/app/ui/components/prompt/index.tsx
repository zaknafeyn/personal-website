// todo add prompt depending on os: mac/win/linux
"use client";

import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faComputer, faMobile } from "@fortawesome/free-solid-svg-icons";
import { faLinux, faApple, faWindows } from "@fortawesome/free-brands-svg-icons";

import styles from "./prompt.module.css"

import { Text } from "../text";

import { getOs, TOperatingSystem } from "app/ui/utils/getOs"

interface PromptProps {
  currentPath?: string;
  promptString?: string;
}

const OS_ICONS: Record<TOperatingSystem, IconDefinition> = {
  "Linux": faLinux,
  "MacOS": faApple,
  "Windows": faWindows,
  "UNIX": faComputer,
  "Other": faComputer,
  "Mobile": faMobile
}

export const Prompt:FC<PromptProps> = ({currentPath = "~", promptString="$"}, ) => {
  const [icon, setIcon] = useState(faComputer);

  useEffect(() => { 
    const os = getOs();
    setIcon(OS_ICONS[os])
  }, [])


  return (
    <div className={styles.promptContainer}>
      <FontAwesomeIcon icon={icon} />
      <Text.Terminal>{ currentPath }</Text.Terminal>
      <Text.Terminal>{promptString}</Text.Terminal>
    </div>
  )
}
