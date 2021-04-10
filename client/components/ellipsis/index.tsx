import React from "react";

type Props = {
  children: string;
  className?: string;
};

export const Ellipsis: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <div
      className={`${className} overflow-hidden overflow-ellipsis whitespace-nowrap`}
    >
      {children}
    </div>
  );
};
