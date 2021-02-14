import React from "react";
import Image from "next/image";
import { getNameInitials } from "../../utils/getNameInitials";

export type AvatarProps = {
  src?: string;
  name?: string;
  size?: "small" | "medium" | "large";
  variant?: "square" | "round";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  role?: "button";
  tabIndex?: number;
};

const defaultStyle = "inline-flex items-center justify-center";

const sizes = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "h-16 w-16",
};

const variants = {
  square: "rounded-md",
  round: "rounded-full border-2 border-blue-100",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "medium",
  variant = "round",
  className,
  name = "",
  role,
  tabIndex,
  ...props
}: AvatarProps) => {
  const SizeStyle = sizes[size];
  const Variant = variants[variant];

  return (
    <span
      className={`${defaultStyle} ${SizeStyle} ${className} ${Variant}`}
      role={role}
      tabIndex={tabIndex}
      {...props}
    >
      {src ? (
        <Image src={src} width="100%" height="100%" className={`${Variant}`} />
      ) : (
        <div
          className={`${Variant} ${SizeStyle} bg-red-200 inline-flex items-center justify-center`}
        >
          {getNameInitials(name)}
        </div>
      )}
    </span>
  );
};
