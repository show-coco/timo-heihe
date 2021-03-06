import React from "react";

type HeadingProps = {
  children: string;
  as?: "h1Small" | "h1Big" | "h2" | "h3";
  className?: string;
};

const color = "text-gray-700";

const styles = {
  h1Big: `text-3xl ${color} m-0`,
  h1Small: `text-lg font-bold ${color} m-0`,
  h2: `text-lg font-bold ${color} m-0`,
  h3: `text-base ${color} m-0`,
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  as = "h1Big",
  className,
}: HeadingProps) => {
  const style = styles[as] + " " + className;

  switch (as) {
    case "h1Big":
      return (
        <h1 className={style} id={children}>
          {children}
        </h1>
      );
    case "h1Small":
      return (
        <h1 className={style} id={children}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={style} id={children}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={style} id={children}>
          {children}
        </h3>
      );
  }
};
