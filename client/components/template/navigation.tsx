import React from "react";

import LogoutIcon from "../../assets/icons/logout.svg";
import Link from "next/link";
import { useAuthContext } from "../../providers/useAuthContext";

const textStyle = "font-semibold text-base text-gray-700 cursor-pointer";
import { IconButton } from "../button/icon-button";
import DotIcon from "../../assets/icons/dot-set.svg";
import { AvatarLink } from "../avatar/avatar-link";
import { Button } from "../button/button";
export const Navigation: React.FC = () => {
  const { logout } = useAuthContext();

  return (
    <div className="w-full h-3/5 p-4 px-12">
      <div className="w-full flex mx-auto justify-between ">
        <div className="text-orange-400 align-middle text-3xl font-bold">
          <Link href="/">Cloud Circle</Link>
          <Link href="/">
            <span className={`${textStyle} pl-16 align-middle`} role="button">
              ルームを探す
            </span>
          </Link>
          <Link href="/">
            <span className={`${textStyle} pl-16 align-middle`} role="button">
              イベントを探す
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="pr-10">
            <Link href="/create-room">
              <Button
                variant="outline"
                size="small"
                className="rounded-full mr-10 align-middle font-medium"
              >
                ルームを作成
              </Button>
            </Link>
            <Link href="/create-room">
              <Button
                variant="outline"
                size="small"
                className="rounded-full align-middle font-medium"
              >
                イベントを作成
              </Button>
            </Link>
          </div>
          <div className="flex items-center">
            <IconButton
              icon={<DotIcon width="30px" height="30px" fill="#555555" />}
              variant="ghost"
              className="mr-10 align-middle "
            />
            <AvatarLink
              avatar="https://bit.ly/kent-c-dodds"
              name="sho"
              className="hover:opacity-80 cursor-pointer align-middle "
              userId="show-coco"
            />
          </div>
        </div>

        {/* <div className="flex items-center">
          <ChatIcon class="w-5 h-5 fill-current mr-3" />
          <Link href="/chat">
            <span className={textStyle} role="button">
              チームチャット
            </span>
          </Link>
        </div> */}

        {/* <div className="flex items-center">
          <LogoutIcon class="w-5 h-5 fill-current mr-3" />
          <span className={textStyle} onClick={logout} role="button">
            ログアウト
          </span>
        </div> */}
      </div>
    </div>
  );
};
