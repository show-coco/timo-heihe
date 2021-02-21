import Link from "next/link";
import React from "react";
import { Avatar, AvatarProps } from "./avatar";

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
  return (
    <span className="mr-2">
      <Link href="/user/[id]" as={`/user/${userId}`}>
        <Avatar
          className={className}
          src={avatar || ""}
          name={name}
          size={size}
          role="button"
          tabIndex={0}
        />
      </Link>
    </span>
  );
};
