import { FC, useEffect } from "react";

import { DescriptionList } from "app/ui/components/descriptionList";
import { Link } from "app/ui/components/link";
import { CommandProps } from "../types";

export const AwardsCommand: FC<CommandProps> = ({ setCommandFinished }) => {
  
  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

  return (
    <>
      <DescriptionList items={[
        {
          label: '2016', values: [
            "University of Oxford",
            <Link key={1} url="https://www.standardbank.com/">
              view scholarship
            </Link>
          ]
        }
      ]} />
    </>
  )
}
