import { FC, useEffect } from "react";

import { DescriptionList } from "app/ui/components/descriptionList";
import { Link } from "app/ui/components/link";
import { CommandProps } from "../types";

export const ContactsCommand: FC<CommandProps> = ({ setCommandFinished }) => {
  
  useEffect(() => {    
    setCommandFinished();
  }, [setCommandFinished]);

  return (
    <>
      <DescriptionList items={[
        {
          label: "Email",
          values: [<Link key={1} url="mailto:zaknafeyn@gmail.com">zaknafeyn@gmail.com</Link>]
        },
        {
          label: "Social networks",
          values: [
            <Link key={1} url="https://github.com/zaknafeyn">Github</Link>,
            <Link key={2} url="https://www.linkedin.com/in/valentineradchuk/">LinkedIn</Link>
          ]
        },
      ]} />
    </>
  )
}
