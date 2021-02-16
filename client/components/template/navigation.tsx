import React from "react";
import ChatIcon from "../../assets/icons/chat.svg";
import PenIcon from "../../assets/icons/pen.svg";
import BoardIcon from "../../assets/icons/board.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import Link from "next/link";
import { useAuthContext } from "../../providers/useAuthContext";

const textStyle = "font-semibold text-base text-gray-700 cursor-pointer";

export const Navigation: React.FC = () => {
  const { logout } = useAuthContext();

  return (
    <div className="w-1/5 items-center">
      <div className="w-3/5 mx-auto space-y-10 mt-12">
        <div className="flex items-center">
          <BoardIcon class="w-5 h-5 fill-current mr-3" />
          <Link href="/">
            <span className={`${textStyle} pt-0.5`} role="button">
              募集掲示板
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <PenIcon class="w-5 h-5 fill-current mr-3" />
          <Link href="/create-space">
            <span className={textStyle} role="button">
              スペース募集を作成
            </span>
          </Link>
        </div>

        {/* <div className="flex items-center">
          <ChatIcon class="w-5 h-5 fill-current mr-3" />
          <Link href="/chat">
            <span className={textStyle} role="button">
              チームチャット
            </span>
          </Link>
        </div> */}

        <div className="flex items-center">
          <LogoutIcon class="w-5 h-5 fill-current mr-3" />
          <span className={textStyle} onClick={logout} role="button">
            ログアウト
          </span>
        </div>
      </div>
    </div>
  );
};
