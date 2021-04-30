import React from "react";

import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useApplyRoomMutation, useRoomQuery } from "../../generated/types";
/* Components */
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import { Heading } from "../../components/heading/heading";
import { Button } from "../../components/button";
import { AvatarWithName } from "../../components/avatar/avatar-with-name";
import { LoginModal } from "../../components/login-modal";
import { Template } from "../../components/template/app/template";
import { Tag } from "../../components/tag";

import { useShareBtn } from "../../hooks/useShareBtn";

import { ShareBtn } from "../../components/share-btn";

import { Meta } from "../../components/meta";
import {
  convertToSkillPochiSetArray,
  SkillPochiSet,
} from "../../components/skill/skill-pochi-set";
import {
  CategorySet,
  convertToCategoryArray,
} from "../../components/category/category-set";
/* Hooks */
import { useModal } from "../../hooks/useModal";
/* Contexts */
import { useAuthContext } from "../../providers/useAuthContext";

type Props = {
  url: string;
  title: string;
};

export default function ShowRoom({ url, title }: Props) {
  const { isAuthenticated, id } = useAuthContext();
  const { isOpen, onOpen, onClose } = useModal();
  const router = useRouter();

  const { data, error } = useRoomQuery({
    variables: {
      slug: router.query.slug?.toString() || "",
    },
  });

  if (error) {
    router.push("/404");
  }

  const [applyRoom] = useApplyRoomMutation();

  const room = data?.room;
  const iamOwner = room?.owner.id === id;

  const { shareUrl } = useShareBtn();

  const onClickApply = (roomId?: number | null) => {
    if (isAuthenticated) {
      applyRoom({
        variables: {
          userId: id,
          roomId: roomId || 0,
        },
      });
    } else {
      onOpen();
    }
  };

  return (
    <>
      <LoginModal isOpen={isOpen} onRequestClose={onClose} />

      <Meta title={title} image={`${url}`} />

      <Template className="py-5 md:p-10">
        {iamOwner && (
          <div className="flex justify-end mb-4">
            <Link
              href={`/room/edit/[slug]?title=${room?.title}`}
              as={`/room/edit/${router.query.slug?.toString() || ""}`}
            >
              <Button>編集する</Button>
            </Link>
          </div>
        )}

        <div className="flex flex-col space-y-8 md:space-x-10 md:flex-row md:space-y-0">
          <Card className="flex-1 p-8">
            <div className="flex justify-between">
              <div className="flex-1">
                <CategorySet
                  categories={convertToCategoryArray(room?.categories || [])}
                  className="mb-4"
                />

                <div className="flex flex-col space-x-3 md:flex-row md:justify-between ">
                  <div className="flex items-center">
                    <Avatar
                      src={room?.icon || ""}
                      name={room?.name}
                      size="large"
                    />
                    <Heading as="h1Big" className="ml-3">
                      {room?.title || ""}
                    </Heading>
                  </div>

                  <div>
                    <ShareBtn shareUrl={shareUrl} />
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col md:items-center md:space-x-8 md:flex-row">
              <span className="flex items-center space-x-3">
                <p className="font-bold whitespace-nowrap">オーナー</p>
                <AvatarWithName
                  src={room?.owner.avatar || ""}
                  userId={room?.owner.userId || ""}
                  name={room?.owner.name || ""}
                  size="small"
                />
              </span>

              <span className="flex items-center space-x-3">
                <p className="font-bold whitespace-nowrap">ルーム名</p>
                <span>{room?.name}</span>
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <div className="markdown">
                <ReactMarkdown>
                  {room?.description || "詳細は何もありません"}
                </ReactMarkdown>
              </div>
            </div>
          </Card>

          <div className="flex flex-col space-y-10 md:w-1/3">
            {room?.withApplication ? (
              <Card className="p-8 text-center">
                <p>
                  オーナーから承認されたらメッセージでやりとりすることができます
                </p>
                <Button
                  className="px-12 mt-5 shadow-lg"
                  onClick={() => onClickApply(room.id)}
                >
                  申請する
                </Button>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p>招待URLからルームへ参加できます</p>
                <p>（DiscordやSlackなど）</p>
                <a href={room?.invidationUrl || ""}>
                  <Button className="px-12 mt-5 shadow-lg">
                    招待URLから参加する
                  </Button>
                </a>
              </Card>
            )}

            <Card className="p-8">
              <div>
                <Heading as="h3" className="mb-2">
                  募集するレベル帯
                </Heading>

                {room?.recruitmentLevels.length ? (
                  <div className="flex flex-wrap">
                    {room.recruitmentLevels.map((level) => {
                      return <Tag key={level.id}>{level.name || ""}</Tag>;
                    })}
                  </div>
                ) : (
                  <p>募集レベルが指定されていません</p>
                )}
              </div>
            </Card>

            <Card className="p-8">
              <Heading as="h3" className="mb-2">
                使用するスキル
              </Heading>

              {room?.skills?.length ? (
                <SkillPochiSet
                  skills={convertToSkillPochiSetArray(room.skills)}
                />
              ) : (
                <p>スキルが登録されていません</p>
              )}
            </Card>
          </div>
        </div>
      </Template>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const { title } = query;

  const url = `https://ogp-mu.vercel.app/${title}.${params?.slug}.png`;
  return {
    props: {
      url,
      title,
    },
  };
};
