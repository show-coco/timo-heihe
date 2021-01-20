import { Meta } from "@storybook/react";
import React from "react";
import { LanguagePochi } from "./language-pochi";
import { LanguagePochiSet } from "./language-pochi-set";

export default {
  title: "LanguagePochi",
} as Meta;

export const languagePochi = () => {
  return <LanguagePochi language="go" />;
};

export const languagePochiSet = () => {
  return (
    <div className="w-1/2">
      <LanguagePochiSet
        languages={[
          "go",
          "typescript",
          "go",
          "typescript",
          "go",
          "typescript",
          "go",
          "typescript",
          "go",
          "typescript",
          "go",
          "typescript",
        ]}
      />
    </div>
  );
};
