import { useRouter } from "next/router";
import React, { useMemo } from "react";
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
import { Button } from "../../components/button";
import { useAuthContext } from "../../providers/useAuthContext";
import Link from "next/link";

export default function ShowTeam() {
  const router = useRouter();
  const id = router.query.id;
  const { id: userId } = useAuthContext();

  const { data } = useTeamQuery({
    variables: {
      id: Number(id),
    },
  });

  const team = data?.team;

  const iAmJoining = useMemo(() => {
    return Boolean(
      team?.members?.filter((member) => member.id === userId).length
    );
  }, [team?.members, userId]);

  const iAmOwner = useMemo(() => {
    return userId === team?.owner.id;
  }, [team?.owner.id, userId]);

  if (!team) return <p>データがありません</p>;

  return (
    <Template>
      <Card className="p-8">
        <div className="flex justify-between">
          <div>
            <CategorySet
              categories={convertToCategoryArray(team.categories)}
              className="mb-4"
            />

            <div className="flex items-center space-x-3">
              <Avatar src={team.icon || ""} size="large" />
              <Heading as="h1Big">{team.title}</Heading>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {iAmOwner && (
              <Link href="/team/edit/[id]" as={`/team/edit/${id}`}>
                <div>
                  <Button>編集する</Button>
                </div>
              </Link>
            )}
            {!iAmJoining && team.isRequired && <Button>申請する</Button>}
            {!iAmJoining && !team.isRequired && <Button>参加する</Button>}
            {iAmJoining && <Button variant="outline">脱退する</Button>}
            {iAmOwner && <Button variant="outline">アーカイブ</Button>}
          </div>
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

        <div className="space-y-2 mt-8">
          <Heading as="h2">チームの説明</Heading>

          <p>{team.description}</p>
        </div>

        <div className="space-y-2 mt-8">
          <Heading as="h2">使用するスキル</Heading>

          <LanguagePochiSet
            languages={convertToSkillPochiSetArray(team.skills)}
          />
        </div>
      </Card>
    </Template>
  );
}
