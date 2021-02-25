import React, { useState } from "react";

import Link from "next/link";
import { useAuthContext } from "../../providers/useAuthContext";
import ChatIcon from "../../assets/icons/chat.svg";

const textStyle = "font-semibold text-base text-gray-700 cursor-pointer";
import { IconButton } from "../button/icon-button";
import DotIcon from "../../assets/icons/dot-set.svg";
import { AvatarLink } from "../avatar/avatar-link";
import { Button } from "../button/button";
export const Navigation: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const { logout } = useAuthContext();
  return (
    <div className="w-full h-3/5 p-4 px-12">
      <div className="w-full flex mx-auto justify-between ">
        <div className="flex items-center text-orange-400 align-middle text-3xl font-bold space-x-16">
          <Link href="/">Cloud Circle</Link>

          <Link href="/">
            <span className={`${textStyle} align-middle`} role="button">
              ルームを探す
            </span>
          </Link>

          {/* <Link href="/">
            <span className={`${textStyle} align-middle`} role="button">
              イベントを探す
            </span>
          </Link> */}

          <Link href="/chat">
            <span className={textStyle} role="button">
              チャット
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <div className="pr-10">
            <Link href="/create-room">
              <Button
                variant="secoundary"
                size="small"
                className="rounded-full mr-10 align-middle font-medium"
              >
                ルームを作成
              </Button>
            </Link>
            {/* <Link href="/create-room">
              <Button
                variant="secoundary"
                size="small"
                className="rounded-full align-middle font-medium "
              >
                イベントを作成
              </Button>
            </Link> */}
          </div>
          <div className="flex items-center overflow-hidden ">
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
              onClick={() => setIsShown(!isShown)}
            />
            {isShown && (
              <div className="absolute right-4 top-20 w-36 h-40 rounded-xl bg-white shadow-lg border px-2 py-4 cursor-default">
                <div className="border-b-2 pb-3">
                  <ul>
                    <li className="font-bold">{`sho`}</li>
                    <li>@{`show-coco`}</li>
                  </ul>
                </div>
                <div className="pt-3">
                  <ul>
                    <li className="cursor-pointer" onClick={logout}>
                      ログアウト
                    </li>
                    <Link href="/user/[id]" as={`/user/${`show-coco`}`}>
                      <li className="cursor-pointer">プロフィール</li>
                    </Link>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

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
