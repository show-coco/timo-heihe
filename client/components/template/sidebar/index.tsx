import Link from "next/link";
import React from "react";
// TODO: なぜかSVGの色変更できなかったので変更できるように修正する
import UserIcon from "../../../assets/icons/user.svg";
import ActiveUserIcon from "../../../assets/icons/user-orange.svg";
import BlocksIcon from "../../../assets/icons/blocks.svg";
import ActiveBlocksIcon from "../../../assets/icons/blocks-orange.svg";
import HandIcon from "../../../assets/icons/hand.svg";
import ActiveHandIcon from "../../../assets/icons/hand-orange.svg";
import { useRouter } from "next/router";

const list = [
  {
    name: "ルーム管理",
    path: "/manager/rooms/owner",
    icon: <BlocksIcon />,
    activeIcon: <ActiveBlocksIcon />,
  },
  {
    name: "受け取った申請",
    path: "/manager/received-applying",
    icon: <HandIcon />,
    activeIcon: <ActiveHandIcon />,
  },
  {
    name: "プロフィール",
    path: "/profile",
    icon: <UserIcon />,
    activeIcon: <ActiveUserIcon />,
  },
];

const linkStyle = "flex items-center px-4 py-4 font-bold rounded-lg w-52";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="w-1/5 h-screen pt-6 bg-white">
      <div className="flex flex-col items-center">
        {list.map((item) => (
          <div key={item.name} className="mb-10">
            <Link href={item.path}>
              {item.path === currentPath ? (
                <a className={`${linkStyle} bg-orange-50 text-orange-primary`}>
                  <span className="flex items-center h-4 mr-5">
                    {item.activeIcon}
                  </span>
                  {item.name}
                </a>
              ) : (
                <a className={`${linkStyle} text-black-300`}>
                  <span className="flex items-center h-4 mr-5">
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
