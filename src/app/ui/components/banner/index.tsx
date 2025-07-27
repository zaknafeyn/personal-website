import React from "react";
import styles from "./banner.module.css"

type BannerProps = {
  banner: string;
};

const Banner = ({ banner }: BannerProps) => {
  return (
    <pre className={styles.terminalBanner}>{banner}</pre>
  )
};

export default Banner;
