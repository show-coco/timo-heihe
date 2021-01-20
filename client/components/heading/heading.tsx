import React from "react";

type HeadingProps = {
  children: React.ReactChild;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

const styles = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2lg",
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  as = "h1",
  className,
}: HeadingProps) => {
  const style = styles[as] + " " + className;

  switch (as) {
    case "h1":
      return <h1 className={style}>{children}</h1>;
    case "h2":
      return <h2 className={style}>{children}</h2>;
    case "h3":
      return <h3 className={style}>{children}</h3>;
  }
};
