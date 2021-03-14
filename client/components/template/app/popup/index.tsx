import Link from "next/link";
import React from "react";
import { AuthContextType } from "../../../providers/useAuthContext";

const linkStye =
  "hover:bg-opacity-10 hover:bg-black-100 py-2 pl-3 cursor-pointer";

type Props = Pick<AuthContextType, "logout" | "userId" | "name">;

export const PopUp: React.FC<Props> = ({ userId, name, logout }: Props) => {
  return (
    <div className="absolute z-10 bg-white border shadow-lg cursor-default right-4 top-20 w-36 rounded-xl">
      <div className="border-b-2">
        <Link href="/user/[id]" as={`/user/${userId}`}>
          <div className={`${linkStye}  rounded-t-xl`}>
            <div className="font-bold">{name}</div>
            <div className="overflow-hidden pr-1">@{userId}</div>
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
  );
};
