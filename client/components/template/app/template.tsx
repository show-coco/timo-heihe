import React from "react";
import { AppHeader } from "./header";

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
        <AppHeader />
        {header}
      </header>

      <main className={`bg-blue-100 min-h-mobile md:min-h-pc ${className}`}>
        {children}
      </main>
    </>
  );
};
