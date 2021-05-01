import React, { VFC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import ReactTooltip from "react-tooltip";

type Props = {
  shareUrl: string;
};
export const ShareBtn: VFC<Props> = ({ shareUrl }: Props) => {
  return (
    <div className="flex">
      <ReactTooltip effect="solid" className="text-white bg-black-400" />
      <FacebookShareButton
        url={shareUrl}
        title="#CloudCircle"
        data-tip="Facebookへシェア"
      >
        <FacebookIcon className="w-10 hover:opacity-80" round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title="#CloudCircle"
        data-tip="Twitterへシェア"
      >
        <TwitterIcon className="w-10 ml-2 hover:opacity-70" round={true} />
      </TwitterShareButton>
    </div>
  );
};
