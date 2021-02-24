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
  onClick,
}: Props) => {
  return (
    <span className="mr-2">
      <Avatar
        className={className}
        src={avatar || ""}
        name={name}
        size={size}
        role="button"
        tabIndex={0}
        onClick={onClick}
      />
    </span>
  );
};
