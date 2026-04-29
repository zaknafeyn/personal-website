import { FC } from "react"

import { Link } from "app/ui/components/link"
import { Text } from "app/ui/components/text"
import { CommandProps } from "../types"

export const RepoCommand: FC<CommandProps> = () => {
  return (
    <>
      <Text.Paragraph>
        Here is my <Link url="https://github.com/zaknafeyn">
          GitHub
        </Link>{" "}
        profile.
      </Text.Paragraph>

      <Text.Paragraph>
        A lot of my professional work lives in private repositories, so the public set is only part of the story. Still, you can see my activity, open-source work, and a few useful artifacts from the engineering trail.
      </Text.Paragraph>
      
      <Text.Paragraph>
        You can try my VS Code extension, <Link url="https://github.com/zaknafeyn/git-smart-checkout">Git Smart Checkout</Link>, which automatically stashes local changes when switching branches.
      </Text.Paragraph>

      <Text.Paragraph>
        You can also browse the <Link url="https://github.com/zaknafeyn/personal-website">source code</Link> for this website.
      </Text.Paragraph>
    </>
  )
}
