import React from "react";
import { Button, ButtonProps } from "./button";

type IconButtonProps = ButtonProps & {
  icon?: React.ReactElement;
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  className,
  ...props
}: IconButtonProps) => {
  const element = icon || children;

  return (
    <Button className={`${className}`} isIcon {...props}>
      {element}
    </Button>
  );
};
