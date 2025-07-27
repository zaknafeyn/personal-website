import { FC, useEffect } from "react"

import { Link } from "app/ui/components/link"
import { Text } from "app/ui/components/text"
import { CommandProps } from "../types"

export const RepoCommand: FC<CommandProps> = ({ setCommandFinished }) => {

  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

  return (
    <>
      <Text.Paragraph>
        Here is my <Link url="https://github.com/craig-feldman">
          GitHub
        </Link>{" "}
      </Text.Paragraph>

      <Text.Paragraph>
        Unfortunately, I could only make a small subset of my projects public. Most of my contributions done into private repos, at least you could see my activity and some stats.
      </Text.Paragraph>
      
      <Text.Paragraph>
        You could try my vscode extension <Link url="https://github.com/zaknafeyn/git-smart-checkout">Git Smart Checkout</Link> that does auto stash when switching a branch
      </Text.Paragraph>

      <Text.Paragraph>
        Review <Link url="https://github.com/zaknafeyn/git-smart-checkout">source code</Link> of this website
      </Text.Paragraph>
    </>
  )
}
