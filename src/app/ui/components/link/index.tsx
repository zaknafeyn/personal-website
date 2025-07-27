import { FC } from "react";

interface LinkProps {
  url: string;
  children: string;
  download?: string;
}

export const Link: FC<LinkProps> = ({ url, children, download }) => {
  if (download) {
    return (
      <a href={url} download={download}>
        {children}
      </a>
    )
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      {children}
    </a>
  )
}
