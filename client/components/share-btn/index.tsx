import React, { VFC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

type Props = {
  url: string;
};
export const ShareBtn: VFC<Props> = ({ url }: Props) => {
  return (
    <div className="flex ">
      <FacebookShareButton url={url}>
        <FacebookIcon className="w-10" round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon className="w-10 ml-2" round={true} />
      </TwitterShareButton>
    </div>
  );
};
