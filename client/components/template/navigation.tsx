import React, { useState } from "react";

import Link from "next/link";
import { useAuthContext } from "../../providers/useAuthContext";
import { IconButton } from "../button/icon-button";
import DotIcon from "../../assets/icons/dot-set.svg";
import { AvatarLink } from "../avatar/avatar-link";
import { Button } from "../button/button";
import { PopUp } from "./popup";

const textStyle = "font-semibold text-base text-gray-700 cursor-pointer";

export const Navigation: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const { logout, avatar, userId, name, isAuthenticated } = useAuthContext();

  return (
    <div className="w-full p-4 px-12 h-3/5">
      <div className="flex justify-between w-full mx-auto ">
        <div className="flex items-center space-x-16 text-3xl font-bold text-orange-400 align-middle">
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

          {isAuthenticated && (
            <Link href="/chat">
              <span className={textStyle} role="button">
                チャット
              </span>
            </Link>
          )}
        </div>

        <div className="flex items-center">
          <div className="pr-10">
            <Link href="/create-room">
              <Button
                variant="outline"
                size="small"
                className="mr-10 font-medium align-middle rounded-full"
              >
                ルームを作成
              </Button>
            </Link>
            {/* <Link href="/create-room">
              <Button
                variant="secoundary"
                size="small"
                className="font-medium align-middle rounded-full "
              >
                イベントを作成
              </Button>
            </Link> */}
          </div>
          <div className="flex items-center overflow-hidden ">
            {/* <IconButton
              icon={<DotIcon width="30px" height="30px" fill="#555555" />}
              variant="ghost"
              className="mr-10 align-middle"
            /> */}

            {isAuthenticated ? (
              <AvatarLink
                avatar={avatar}
                name={name}
                className="align-middle cursor-pointer hover:opacity-80 "
                userId={userId}
                onClick={() => setIsShown(!isShown)}
              />
            ) : (
              <Link href="http://localhost:8080/google">
                <Button colorScheme="blue">Login</Button>
              </Link>
            )}
            {isShown && <PopUp logout={logout} userId={userId} name={name} />}
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
