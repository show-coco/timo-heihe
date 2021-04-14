import React from "react";
import {
  FacebookShareCount,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
export const ShareBtn = () => {
  return (
    <div className="flex">
      <FacebookIcon className="rounded-full " />
      <TwitterIcon className="rounded-full" />
    </div>
  );
};
