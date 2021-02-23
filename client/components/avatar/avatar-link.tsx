import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarProps } from "./avatar";
import { useAuthContext } from "../../providers/useAuthContext";

type Props = {
  userId: string;
  avatar?: string | null;
  name: string;
  className?: string;
  size?: AvatarProps["size"];
};

export const AvatarLink: React.FC<Props> = ({
  userId,
  avatar,
  name,
  className,
  size,
}: Props) => {
  const [isShown, setIsShown] = useState(false);
  const { logout } = useAuthContext();
  return (
    <span className="mr-2">
      <Avatar
        className={className}
        src={avatar || ""}
        name={name}
        size={size}
        role="button"
        tabIndex={0}
        onClick={() => setIsShown(!isShown)}
      />
      {isShown && (
        <div className="absolute right-4 mt-4 w-36 h-40 rounded-xl bg-white shadow-lg border px-2 py-4 cursor-default">
          <div className="border-b-2 pb-3">
            <ul>
              <li className="font-bold">{name}</li>
              <li>@{userId}</li>
            </ul>
          </div>
          <div className="pt-3">
            <ul>
              <li className="cursor-pointer" onClick={logout}>
                ログアウト
              </li>
              <Link href="/user/[id]" as={`/user/${userId}`}>
                <li className="cursor-pointer">プロフィール</li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </span>
  );
};
