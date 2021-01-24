import React from "react";

type CategoryProps = {
  children: React.ReactChild;
  className?: string;
};

export const Category: React.FC<CategoryProps> = ({
  children,
  className,
}: CategoryProps) => {
  return (
    <span className={`bg-orange-300 px-2 py-1 rounded-md ${className}`}>
      {children}
    </span>
  );
};
