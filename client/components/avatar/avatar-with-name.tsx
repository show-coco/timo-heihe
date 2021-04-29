import Link from "next/link";
import React from "react";
import { Avatar, AvatarProps } from "./avatar";

export type AvatarWithNameProps = Required<Pick<AvatarProps, "src" | "name">> &
  Pick<AvatarProps, "size"> & {
    className?: string;
    userId: string;
  };

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  className,
  userId,
  ...props
}: AvatarWithNameProps) => {
  return (
    <Link href="/user/[id]" as={`/user/${userId}`}>
      <a
        className={`flex items-center space-x-2 ${className} cursor-pointer whitespace-nowrap`}
      >
        <Avatar {...props} className="hover:shadow-md" />
        <p className="mr-5 hover:underline">{props.name}</p>
      </a>
    </Link>
  );
};
