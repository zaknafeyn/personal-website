import { FC } from "react"

import { CommandProps } from "../types"
import { getRepoContent } from "../content"
import { CommandContentView } from "../contentRenderer"

export const RepoCommand: FC<CommandProps> = () => {
  return <CommandContentView content={getRepoContent()} />
}
