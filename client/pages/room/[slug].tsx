import React from "react";

import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import {
  CategorySet,
  convertToCategoryArray,
} from "../../components/category/category-set";
import { Heading } from "../../components/heading/heading";
import {
  convertToSkillPochiSetArray,
  SkillPochiSet,
} from "../../components/skill/skill-pochi-set";
import { Button } from "../../components/button";
import Link from "next/link";
import { AvatarWithName } from "../../components/avatar/avatar-with-name";
import ReactMarkdown from "react-markdown";
import { useAuthContext } from "../../providers/useAuthContext";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../../components/login-modal";
import { Template } from "../../components/template/app/template";
import { Tag } from "../../components/tag";
import { useApplyRoomMutation, useRoomQuery } from "../../generated/types";
import { UseShareBtn } from "../../hooks/useShareBtn";
import { useRouter } from "next/router";
import { ShareBtn } from "../../components/share-btn";

export default function ShowRoom() {
  const { isAuthenticated, id } = useAuthContext();
  const { isOpen, onOpen, onClose } = useModal();

  const router = useRouter();
  const { data } = useRoomQuery({
    variables: {
      slug: router.query.slug?.toString() || "",
    },
  });
  const [applyRoom] = useApplyRoomMutation();

  const room = data?.room;
  const iamOwner = room?.owner.id === id;
  const { url } = UseShareBtn();
  return (
    <>
      <LoginModal isOpen={isOpen} onRequestClose={onClose} />
      {console.log(router.asPath)}
      <Template className="p-10">
        {iamOwner && (
          <div className="flex justify-end mb-4">
            <Link
              href="/room/edit/[slug]"
              as={`/room/edit/${router.query.slug?.toString() || ""}`}
            >
              <Button>編集する</Button>
            </Link>
          </div>
        )}

        <div className="flex flex-row space-x-10">
          <Card className="flex-1 p-8">
            <div className="flex justify-between">
              <div className="flex-1">
                <CategorySet
                  categories={convertToCategoryArray(room?.categories || [])}
                  className="mb-4"
                />

                <div className="flex justify-between space-x-3 ">
                  <div className="flex items-center">
                    <Avatar
                      src={room?.icon || ""}
                      name={room?.name}
                      size="large"
                    />
                    <Heading as="h1Big">{room?.name || ""}</Heading>
                  </div>

                  <div>
                    <ShareBtn url={url} />
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex items-center space-x-8">
              <span className="flex items-center space-x-3">
                <p className="font-bold">オーナー</p>
                <AvatarWithName
                  src={room?.owner.avatar || ""}
                  userId={room?.owner.userId || ""}
                  name={room?.owner.name || ""}
                  size="small"
                />
              </span>

              <span className="flex items-center space-x-3">
                <p className="font-bold">ルーム名</p>
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

          <div className="flex flex-col w-1/3 space-y-10">
            {room?.withApplication ? (
              <Card className="p-8 text-center">
                <p>
                  オーナーから承認されたらメッセージでやりとりすることができます
                </p>
                <Button
                  className="px-12 mt-5 shadow-lg"
                  onClick={() => {
                    console.log("clicked");
                    applyRoom({
                      variables: {
                        userId: id,
                        roomId: room.id || 0,
                      },
                    });
                  }}
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
              <div className="mb-7">
                <Heading as="h3">募集するレベル帯</Heading>
                <div className="flex flex-wrap mt-3">
                  {room?.recruitmentLevels.map((level) => {
                    return <Tag key={level.id}>{level.name || ""}</Tag>;
                  })}
                </div>
              </div>
              {/* <div>
                <Heading as="h3" className="mb-3">
                  募集する役割
                </Heading>
                <div className="space-y-1">
                  <p>モバイルエンジニア</p>
                  <p>インフラエンジニア</p>
                  <p>デザイナー</p>
                  <p>フロントエンドエンジニア</p>
                </div>
              </div> */}
            </Card>

            <Card className="p-8">
              <Heading as="h3">使用するスキル</Heading>

              <SkillPochiSet
                skills={convertToSkillPochiSetArray(room?.skills)}
              />
            </Card>
          </div>
        </div>
      </Template>
    </>
  );
}
