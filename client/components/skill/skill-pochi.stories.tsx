import { Meta } from "@storybook/react";
import React from "react";
import { SkillPochi } from "./skill-pochi";
import { SkillPochiSet } from "./skill-pochi-set";

export default {
  title: "LanguagePochi",
} as Meta;

export const languagePochi = () => {
  return <SkillPochi skill="go" />;
};

export const languagePochiSet = () => {
  return (
    <div className="w-1/2">
      <SkillPochiSet
        skills={[
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
