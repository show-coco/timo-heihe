import React from "react";
import { Card } from "./card";
import PeopleIcon from "../../assets/icons/people.svg";
import {
  LanguagePochiSet,
  LanguagePochiSetProps,
} from "../language/language-pochi-set";
import {
  AvatarWithName,
  AvatarWithNameProps,
} from "../avatar/avatar-with-name";

export type TeamCardProps = {
  title: string;
  leader: AvatarWithNameProps;
  description: string;
  languages: LanguagePochiSetProps["languages"];
  created: string;
};

export const TeamCard: React.FC<TeamCardProps> = ({
  title,
  leader,
  description,
  languages,
  created,
}: TeamCardProps) => {
  return (
    <Card variant="none" className="max-w-xl p-5 cursor-pointer">
      <div className="flex items-center">
        <h3 className="flex-1">{title}</h3>

        <AvatarWithName
          src={leader.src}
          name={leader.name}
          size="small"
          className="mr-4"
        />

        <PeopleIcon />
        <p className="ml-2">23/50</p>
      </div>

      <div className="pt-4 pb-6">{description}</div>

      <div className="flex items-end">
        <LanguagePochiSet languages={languages} className="flex-1" />

        <span className="space-x-2">
          <span>作成日</span>
          <span>{created}</span>
        </span>
      </div>
    </Card>
  );
};
