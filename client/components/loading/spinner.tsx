import React from "react";

type Props = {
  className?: string;
};

export const Spinner: React.FC<Props> = ({ className }: Props) => {
  return <span className={`spinner ${className}`}></span>;
};
