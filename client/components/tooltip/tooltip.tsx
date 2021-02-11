import React from "react";

type Props = {
  children: React.ReactChild;
};

export const Tooltip: React.FC<Props> = ({ children }: Props) => {
  return (
    <span className="tooltip text-xs bg-black-400 text-white absolute inline-block rounded-sm p-1">
      {children}
    </span>
  );
};
