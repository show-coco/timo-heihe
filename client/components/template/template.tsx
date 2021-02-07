import React from "react";
import { AppHeader } from "./header";
import { Navigation } from "./navigation";

type TemplateProps = {
  children: React.ReactNode;
  className?: string;
};

export const Template: React.FC<TemplateProps> = ({
  children,
  className,
}: TemplateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <div className="flex flex-1">
        <Navigation />
        <main className={`flex-1 bg-blue-100 ${className}`}>{children}</main>
      </div>
    </div>
  );
};
