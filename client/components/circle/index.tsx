import React, { FC } from "react";
type CircleButtonProps = {
  className?: string;
  parentWith?: string;
};
export const Circle: FC<CircleButtonProps> = ({
  className,
  parentWith,
}: CircleButtonProps) => {
  const defaultStyle = "m-auto  rounded-full";
  const style = defaultStyle + " " + className;
  return (
    <div className={parentWith}>
      <div className={style}></div>
    </div>
  );
};
