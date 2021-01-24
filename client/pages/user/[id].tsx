import { useRouter } from "next/router";
import React from "react";
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

export default function UserDetail() {
  const router = useRouter();
  const id = router.query.id;

  const { data } = useUserDetailPageQuery({
    variables: {
      id: id?.toString() || "",
    },
  });

  console.log(data);
  const teams = convertToTeamCardObjFromTeams(data?.user.teams || []);

  return (
    <Template>
      <div className="grid grid-rows-2 md:grid-cols-2 gap-10">
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
            <a className="cursor-pointer">
              <GithubIcon />
            </a>
            <a className="cursor-pointer">
              <TwitterIcon class="bg-blue-400 rounded-full" />
            </a>
          </div>
        </Card>

        <Card className="p-8">Learning Skills</Card>
      </div>

      <div className="space-y-2">
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
