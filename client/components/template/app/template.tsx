import React from "react";
import { Navigation } from "./navigation";

type TemplateProps = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactElement;
};

export const Template: React.FC<TemplateProps> = ({
  children,
  className,
  header,
}: TemplateProps) => {
  return (
    <>
      <header className="min-h-20">
        <Navigation />
        {header}
      </header>

      <main className={`bg-blue-100 min-h-mobile md:min-h-pc ${className}`}>
        {children}
      </main>
    </>
  );
};
