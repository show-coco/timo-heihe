import React, { VFC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

type Props = {
  shareUrl: string;
};
export const ShareBtn: VFC<Props> = ({ shareUrl }: Props) => {
  return (
    <div className="flex">
      <FacebookShareButton url={shareUrl} title="#CloudCircle">
        <FacebookIcon className="w-10 hover:opacity-80" round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title="#CloudCircle">
        <TwitterIcon className="w-10 ml-2 hover:opacity-70" round={true} />
      </TwitterShareButton>
    </div>
  );
};
