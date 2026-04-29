import React, { ReactNode } from "react";
import { Text } from "../text";

type BannerProps = {
  bannerTitle: string;
  bannerSubTitle?: ReactNode;
};

const Banner = ({ bannerTitle, bannerSubTitle }: BannerProps) => {
  return (
    <>
      <Text.Header>{bannerTitle}</Text.Header>
      {bannerSubTitle && <Text.SubHeader>{bannerSubTitle}</Text.SubHeader>}
    </>
  )
};

export default Banner;
