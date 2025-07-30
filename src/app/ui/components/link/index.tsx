import classNames from "classnames";
import { FC } from "react";

import styles from "./link.module.css";

interface LinkProps {
  url: string;
  children: string;
  download?: string;
  className?: string;
}

export const Link: FC<LinkProps> = ({ url, children, download, className }) => {
  if (download) {
    return (
      <a
        className={classNames(styles.link, className)}
        href={url}
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      className={classNames(styles.link, className)}
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      {children}
    </a>
  );
};
