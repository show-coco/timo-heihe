import { useRouter } from "next/router";
import React from "react";
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import {
  CategorySet,
  convertToCategoryArray,
} from "../../components/category/category-set";
import { Heading } from "../../components/heading/heading";
import { Template } from "../../components/template/template";
import { useTeamQuery } from "../../generated/types";
import PeopleIcon from "../../assets/icons/people.svg";
import {
  convertToSkillPochiSetArray,
  LanguagePochiSet,
} from "../../components/language/language-pochi-set";

export default function ShowTeam() {
  const router = useRouter();
  const id = router.query.id;

  const { data } = useTeamQuery({
    variables: {
      id: Number(id),
    },
  });

  if (!data) return <p>データがありません</p>;
  const team = data?.team;

  return (
    <Template>
      <Card className="p-8 space-y-6">
        <CategorySet
          categories={convertToCategoryArray(team.categories)}
          className="mb-4"
        />

        <div className="flex items-center space-x-3">
          <Avatar src={team.icon || ""} size="large" />
          <Heading as="h1Big">{team.title}</Heading>
        </div>

        <div className="flex items-center space-x-8">
          <span className="flex items-center space-x-3">
            <p className="font-bold">人数</p>
            <span className="flex items-center space-x-3">
              <PeopleIcon />
              <span>
                {team.members?.length}/{team.recruitNumbers}
              </span>
            </span>
          </span>

          <span className="flex items-center space-x-3">
            <p className="font-bold">リーダー</p>
            <Avatar src={team.owner.avatar || ""} size="small" />
            <span>{team.owner.name}</span>
          </span>
        </div>

        <div className="space-y-2">
          <Heading as="h2">チームの説明</Heading>

          <p>{team.description}</p>
        </div>

        <div className="space-y-2">
          <Heading as="h2">使用するスキル</Heading>

          <LanguagePochiSet
            languages={convertToSkillPochiSetArray(team.skills)}
          />
        </div>
      </Card>
    </Template>
  );
}
