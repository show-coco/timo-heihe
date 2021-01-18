import React from "react";
import { Avatar, AvatarProps } from "./avatar";

export type AvatarWithNameProps = Required<Pick<AvatarProps, "src" | "name">> &
  Pick<AvatarProps, "size"> & {
    className?: string;
  };

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  className,
  ...props
}: AvatarWithNameProps) => {
  return (
    <span className={`flex items-center space-x-2 ${className}`}>
      <Avatar {...props} />
      <p className="mr-5">{props.name}</p>
    </span>
  );
};
