import React from "react";
import { Header } from "./header";
import { Navigation } from "./navigation";

type TemplateProps = {
  children: React.ReactNode;
};

export const Template: React.FC<TemplateProps> = ({
  children,
}: TemplateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <Navigation />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
