import React, { useState } from "react";

import Link from "next/link";
import { useAuthContext } from "../../providers/useAuthContext";
import { IconButton } from "../button/icon-button";
import DotIcon from "../../assets/icons/dot-set.svg";
import { AvatarLink } from "../avatar/avatar-link";
import { Button } from "../button/button";

const textStyle = "font-semibold text-base text-gray-700 cursor-pointer";
const linkStye =
  "hover:bg-opacity-10 hover:bg-black-100 py-2 pl-3 cursor-pointer";

export const Navigation: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const { logout, avatar, userId, name } = useAuthContext();

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
                variant="outline"
                size="small"
                className="rounded-full mr-10 align-middle font-medium text-orange-400 border-orange-400"
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
              avatar={avatar}
              name={name}
              className="hover:opacity-80 cursor-pointer align-middle "
              userId={userId}
              onClick={() => setIsShown(!isShown)}
            />
            {isShown && (
              <div className="absolute right-4 top-20 w-36 rounded-xl bg-white shadow-lg border cursor-default">
                <div className="border-b-2">
                  <Link href="/user/[id]" as={`/user/${userId}`}>
                    <div className={`${linkStye}  rounded-t-xl`}>
                      <div className="font-bold">{name}</div>
                      <div>@{userId}</div>
                    </div>
                  </Link>
                </div>
                <div>
                  <button
                    className={`${linkStye} w-full h-full text-left rounded-b-xl`}
                    onClick={logout}
                  >
                    ログアウト
                  </button>
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
