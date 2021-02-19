import Link from "next/link";
import React from "react";
import { Avatar } from "./avatar";

type Props = {
  userId: string;
  avatar?: string | null;
  name: string;
};

export const AvatarLink: React.FC<Props> = ({
  userId,
  avatar,
  name,
}: Props) => {
  return (
    <span className="mr-2">
      <Link href="/user/[id]" as={`/user/${userId}`}>
        <Avatar
          src={avatar || ""}
          name={name}
          size="small"
          role="button"
          tabIndex={0}
        />
      </Link>
    </span>
  );
};
