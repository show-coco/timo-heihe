import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../../components/card/team-card";
import { Heading } from "../../components/heading/heading";
import { useUserDetailPageQuery } from "../../generated/types";
import TwitterIcon from "../../assets/icons/twitter.svg";
import GithubIcon from "../../assets/icons/github.svg";
import {
  convertToSkillPochiSetArray,
  SkillPochiSet,
} from "../../components/skill/skill-pochi-set";
import { Button } from "../../components/button";
import { useAuthContext } from "../../providers/useAuthContext";
import Link from "next/link";
import { Template } from "../../components/template/app/template";
import ReactMarkdown from "react-markdown";

export default function UserDetail() {
  const router = useRouter();
  const id = router.query.id;
  const { id: loginUserId } = useAuthContext();

  const { data, error } = useUserDetailPageQuery({
    variables: {
      userId: id?.toString() || "",
    },
  });

  console.error(error);

  const iAmLoginUser = useMemo(() => data?.user.id === loginUserId, [
    data?.user.id,
    loginUserId,
  ]);

  // FIXME
  const teams = convertToTeamCardObjFromTeams(data?.user.teams || []);

  return (
    <Template className="p-10">
      {iAmLoginUser && (
        <div className="flex justify-end mb-4">
          <Link href="/user/edit/[id]" as={`/user/edit/${id}`}>
            <Button className="hidden md:inline">編集する</Button>
          </Link>
          <Link href="/user/edit/[id]" as={`/user/edit/${id}`}>
            <Button variant="outline" colorScheme="blue" className="md:hidden">
              編集する
            </Button>
          </Link>
        </div>
      )}
      <div className="flex flex-col space-x-10 md:flex-row">
        <Card className="w-2/3 p-8 space-y-5">
          <span className="flex items-center space-x-3">
            <Avatar src={data?.user.avatar || ""} size="large" />

            <span>
              <Heading className="text-xl" as="h2">
                {data?.user.name || ""}
              </Heading>
              <span>@{data?.user.userId}</span>
            </span>
          </span>

          <div className="markdown">
            <ReactMarkdown>
              {data?.user.introduction || "自己紹介文を設定してください"}
            </ReactMarkdown>
          </div>

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

        <div className="w-1/3">
          <Card className="p-8 space-y-5">
            <Heading as="h2">スキル</Heading>

            {data?.user.skills && data?.user.skills.length ? (
              <SkillPochiSet
                skills={convertToSkillPochiSetArray(data?.user.skills)}
              />
            ) : (
              <p>スキルを登録してください</p>
            )}
          </Card>
        </div>
      </div>
    </Template>
  );
}
