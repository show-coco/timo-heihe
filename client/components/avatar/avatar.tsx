import React from "react";
import Image from "next/image";

export type AvatarProps = {
  src: string;
  name?: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const defaultStyle =
  "inline-flex items-center justify-center rounded-full border-2 border-blue-100";

const sizes = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "h-16 w-16",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "medium",
  className,
  ...props
}: AvatarProps) => {
  const SizeStyle = sizes[size];

  return (
    <span className={`${defaultStyle} ${SizeStyle} ${className}`} {...props}>
      {src ? (
        <Image src={src} width="100%" height="100%" className="rounded-full" />
      ) : (
        <img src={src} width="100%" height="100%" className="rounded-full" />
      )}
    </span>
  );
};
