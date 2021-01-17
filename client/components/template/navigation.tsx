import React from "react";
import ChatIcon from "../../assets/icons/chat.svg";
import PenIcon from "../../assets/icons/pen.svg";
import BoardIcon from "../../assets/icons/board.svg";
import Link from "next/link";

const textStyle = "font-semibold text-lg text-gray-700 cursor-pointer";

export const Navigation: React.FC = () => {
  return (
    <div className="w-1/5 items-center">
      <div className="w-3/5 mx-auto space-y-10 mt-20">
        <div className="flex items-center">
          <BoardIcon class="w-5 h-5 fill-current mr-3" />
          <Link href="#">
            <span className={`${textStyle} pt-0.5`}>チーム募集掲示板</span>
          </Link>
        </div>
        <div className="flex items-center">
          <PenIcon class="w-5 h-5 fill-current mr-3" />
          <a className={textStyle}>チームを作成する</a>
        </div>
        <div className="flex items-center">
          <ChatIcon class="w-5 h-5 fill-current mr-3" />
          <a className={textStyle} href="#">
            チームチャット
          </a>
        </div>
      </div>
    </div>
  );
};
