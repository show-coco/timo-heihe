import React from "react";

type PochiProps = {
  className: string;
};

export const Pochi: React.FC<PochiProps> = ({ className }: PochiProps) => {
  return <span className={`rounded-full w-5 h-5 ${className}`} />;
};
