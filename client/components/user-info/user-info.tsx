import Link from "next/link";
import React from "react";
import { UserInfoFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";

type Props = UserInfoFragment & {
  className?: string;
};

export const UserInfo: React.FC<Props> = (props: Props) => {
  return (
    <div className={`flex items-center ${props.className}`}>
      <Link href="/user/[id]" as={`/user/${props.userId}`}>
        <Avatar src={props.avatar || ""} className="cursor-pointer" />
      </Link>
      <div className="ml-4">
        <div className="font-bold">{props.name}</div>
        <div>@{props.userId}</div>
      </div>
    </div>
  );
};
