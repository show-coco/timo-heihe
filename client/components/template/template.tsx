import React from "react";
import { DefaultHeader } from "./header/default";
import { Navigation } from "./navigation";

type TemplateProps = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactElement;
};

export const Template: React.FC<TemplateProps> = ({
  children,
  className,
  header = <DefaultHeader />,
}: TemplateProps) => {
  return (
    <div className="flex flex-row min-h-screen">
      <Navigation />

      <div className="flex flex-col flex-1">
        {header}
        <main className={`flex-1 bg-blue-100 ${className}`}>{children}</main>
      </div>
    </div>
  );
};
