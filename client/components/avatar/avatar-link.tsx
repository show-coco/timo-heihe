import Link from "next/link";
import React from "react";
import { Avatar, AvatarProps } from "./avatar";

type Props = {
  userId: string;
  avatar?: string | null;
  name: string;
  className?: string;
  size?: AvatarProps["size"];
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

export const AvatarLink: React.FC<Props> = ({
  avatar,
  name,
  className,
  size,
  userId,
  onClick,
}: Props) => {
  return (
    <Link href="/user/[id]" as={`/user/${userId}`}>
      <Avatar
        className={className}
        src={avatar || ""}
        name={name}
        size={size}
        role="button"
        tabIndex={0}
        onClick={onClick}
      />
    </Link>
  );
};
