import React, { FC } from "react";
type CircleButtonProps = {
  className?: string;
};
export const Circle: FC<CircleButtonProps> = ({
  className,
}: CircleButtonProps) => {
  const defaultStyle = "m-auto  rounded-full";
  const style = defaultStyle + " " + className;

  return (
    <div>
      <div className={style}></div>
    </div>
  );
};
