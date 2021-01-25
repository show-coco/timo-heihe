import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../../components/card/team-card";
import { Heading } from "../../components/heading/heading";
import { Template } from "../../components/template/template";
import { useUserDetailPageQuery } from "../../generated/types";
import TwitterIcon from "../../assets/icons/twitter.svg";
import GithubIcon from "../../assets/icons/github.svg";
import {
  convertToSkillPochiSetArray,
  LanguagePochiSet,
} from "../../components/language/language-pochi-set";
import { Button } from "../../components/button";
import { useAuthContext } from "../../providers/useAuthContext";
import Link from "next/link";

export default function UserDetail() {
  const router = useRouter();
  const id = router.query.id;
  const { id: loginUserId } = useAuthContext();

  const { data } = useUserDetailPageQuery({
    variables: {
      id: id?.toString() || "",
    },
  });

  const iAmLoginUser = useMemo(() => data?.user.id === loginUserId, [
    data?.user.id,
    loginUserId,
  ]);

  const teams = convertToTeamCardObjFromTeams(data?.user.teams || []);

  return (
    <Template>
      {iAmLoginUser && (
        <div className="flex justify-end mb-4">
          <Link href="/user/edit/[id]" as={`/user/edit/${id}`}>
            <Button>編集する</Button>
          </Link>
        </div>
      )}
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none gap-10">
        <Card className="p-8 space-y-5">
          <span className="flex space-x-3 items-center">
            <Avatar src={data?.user.avatar || ""} size="large" />

            <span>
              <Heading className="text-xl" as="h2">
                {data?.user.name || ""}
              </Heading>
              <span>@{data?.user.id}</span>
            </span>
          </span>

          <p>{data?.user.introduction || "自己紹介文を設定してください"}</p>

          <div className="flex space-x-4">
            {data?.user.githubId && (
              <a
                className="cursor-pointer"
                href={`https://github.com/${data?.user.githubId}`}
                target="blank"
              >
                <GithubIcon />
              </a>
            )}
            {data?.user.twitterId && (
              <a
                className="cursor-pointer"
                href={`https://twitter.com/${data?.user.twitterId}`}
                target="blank"
              >
                <TwitterIcon class="bg-blue-400 rounded-full" />
              </a>
            )}
          </div>
        </Card>

        <Card className="p-8 space-y-5">
          <Heading as="h2">スキル</Heading>

          {data?.user.skills.length ? (
            <LanguagePochiSet
              languages={convertToSkillPochiSetArray(data?.user.skills)}
            />
          ) : (
            <p>スキルを登録してください</p>
          )}
        </Card>
      </div>

      <div className="space-y-2 mt-10">
        <Heading as="h1Small">所属しているチーム</Heading>

        <div className="space-y-5">
          {teams.map((team) => (
            <TeamCard {...team} key={team.id} />
          ))}
        </div>
      </div>
    </Template>
  );
}
