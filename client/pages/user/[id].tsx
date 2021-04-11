import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
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
import { Meta } from "../../components/meta";
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

  return (
    <Template className="md:p-10">
      <Meta title={"ユーザー詳細 | CloudCircle"} />
      {iAmLoginUser && (
        <div className="justify-end hidden mb-4 md:flex">
          <Link href="/user/edit/[id]" as={`/user/edit/${id}`}>
            <Button>編集する</Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col md:space-x-10 md:flex-row">
        <Card className="bg-blue-100 md:space-y-5 md:p-8 md:bg-white md:w-2/3">
          <span className="flex flex-col items-center p-5 px-12 bg-white md:items-start md:p-0">
            <div className="flex flex-row w-full md:justify-start">
              <Avatar
                src={data?.user.avatar || ""}
                size="large"
                className="mr-2 "
              />
              <div className="flex items-center">
                <Heading className="text-xl " as="h2">
                  {data?.user.name || ""}
                </Heading>
              </div>
            </div>

            <div className="flex flex-row items-end justify-between w-full md:justify-center">
              <span className="w-2/3 pr-5 break-words md:w-full">
                @{data?.user.userId}
              </span>
              {iAmLoginUser && (
                <Link href="/user/edit/[id]" as={`/user/edit/${id}`}>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    className="w-24 h-5 ml-auto md:ml-0 md:hidden"
                  >
                    編集する
                  </Button>
                </Link>
              )}
            </div>

            <span>
              {/* <Heading className="text-xl" as="h2">
                {data?.user.name || ""}
              </Heading> */}
              {/* <span>@{data?.user.userId}</span> */}
            </span>
          </span>

          <div className="p-8 markdown md:p-0">
            <ReactMarkdown>
              {data?.user.introduction || "自己紹介文を設定してください"}
            </ReactMarkdown>
          </div>

          <div className="flex ">
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

        <div className="md:w-1/3">
          <Card className="p-8 space-y-5 bg-blue-100 md:bg-white">
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
