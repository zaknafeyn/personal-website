import React from "react";
import { Text } from "../text";

type BannerProps = {
  bannerTitle: string;
  bannerSubTitle?: string;
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
