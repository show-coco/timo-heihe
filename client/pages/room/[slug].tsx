import React, { useEffect, useState } from "react";
import { ApolloCache, gql } from "@apollo/client";
import { client } from "../../../client/pages/_app";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DeleteRoomMutation,
  RoomQuery,
  useApplyRoomMutation,
  useDeleteRoomMutation,
  UserDetailPageDocument,
  UserDetailPageQuery,
  UserDetailPageQueryVariables,
  useRoomQuery,
} from "../../generated/types";
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
import { Skeleton } from "../../components/loading/skeleton";
import { sanitize } from "../../utils/sanitize";
import { Modal } from "../../components/modal/modal";
type Props = {
  url: string;
  title: string;
  data?: RoomQuery;
  roomLoading: boolean;
};

export default function ShowRoom({ url, title, data, roomLoading }: Props) {
  const { isAuthenticated, id } = useAuthContext();
  const { isOpen, onOpen, onClose } = useModal();
  const [room, setRoom] = useState<RoomQuery["room"] | undefined>(data?.room);
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalonOpen,
    onClose: deleteModalonClose,
  } = useModal();
  const router = useRouter();
  const [applyClicked, setApplyClicked] = useState(false);
  const isMine = data?.room.owner.id === id;

  // オーナーがユーザー詳細更新後にクライアント側でオーナーの場合のみ最新のデータをフェッチ
  // 参考: https://zenn.dev/catnose99/articles/8bed46fb271e44
  const { data: newRoomData } = useRoomQuery({
    variables: {
      slug: router.query.slug?.toString() || "",
      isMine: isMine,
    },
  });

  useEffect(() => {
    if (newRoomData?.room) {
      setRoom(newRoomData.room);
    }
  }, [newRoomData]);

  useEffect(() => {
    setRoom(data?.room);
  }, [data?.room]);

  // if (error) {
  //   console.log(error);
  //   router.push("/404");
  // }

  const iamOwner = room?.owner.id === id;
  const iamApplying =
    room?.applyingUsers?.findIndex((user) => user.user?.id === id) !== -1;

  const updateDelete = (client: ApolloCache<DeleteRoomMutation>) => {
    const data: UserDetailPageQuery | null = client.readQuery<
      UserDetailPageQuery,
      UserDetailPageQueryVariables
    >({
      query: UserDetailPageDocument,
      variables: {
        userId: room?.owner.userId || "",
      },
    });

    if (data) {
      const deletedRooms = data.rooms.filter((r) => r.id !== room?.id);
      client.writeQuery<UserDetailPageQuery, UserDetailPageQueryVariables>({
        query: UserDetailPageDocument,
        variables: {
          userId: room?.owner.userId || "",
        },
        data: {
          user: data.user,
          rooms: deletedRooms,
        },
      });
    }
  };

  const [applyRoom, { loading: applyLoading }] = useApplyRoomMutation();
  const [deleteRoom, { loading: deleteLoading }] = useDeleteRoomMutation({
    variables: {
      id: room?.id || 0,
    },
    update: updateDelete,
  });

  const { shareUrl } = useShareBtn();

  const onClickApply = async (roomId?: number | null) => {
    if (isAuthenticated) {
      await applyRoom({
        variables: {
          userId: id,
          roomId: roomId || 0,
        },
      });
      setApplyClicked(true);
    } else {
      onOpen();
    }
  };

  const onDeleteRoom = async () => {
    await deleteRoom();
    deleteModalonClose();
    router.push("/");
  };

  return (
    <>
      <LoginModal isOpen={isOpen} onRequestClose={onClose} />
      <Modal isOpen={deleteModalIsOpen} onRequestClose={deleteModalonClose}>
        <div className="flex flex-col items-center justify-center space-y-7">
          <Heading as="h2">ルームを削除しますか</Heading>
          <Button onClick={onDeleteRoom} loading={deleteLoading}>
            ルームを削除する
          </Button>
        </div>
      </Modal>

      <Meta
        title={title}
        image={`${decodeURIComponent(url)}`}
        description={data?.room.description}
      />

      <Template className="py-5 md:p-10">
        {iamOwner && (
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => deleteModalonOpen()}
                variant="outline"
                colorScheme="red"
              >
                削除する
              </Button>

              <Link
                href={`/room/edit/[slug]`}
                as={`/room/edit/${router.query.slug?.toString() || ""}`}
              >
                <Button>編集する</Button>
              </Link>
            </div>
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
                {roomLoading && <Skeleton />}
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
                  loading={applyLoading}
                  disabled={iamOwner || iamApplying || applyClicked}
                >
                  {applyClicked ? "申請しました" : "申請する"}
                </Button>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p>招待URLからルームへ参加できます</p>
                <p>（DiscordやSlackなど）</p>
                <a href={sanitize(room?.invidationUrl || "")}>
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
                      return <Tag key={level?.id}>{level?.name || ""}</Tag>;
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
type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { data, loading: roomLoading } = await client.query({
    query: gql`
      query Room($slug: String!) {
        room(slug: $slug) {
          id
          title
          name
          description
          icon
          withApplication
          repositoryUrl
          invidationUrl
          applyingUsers {
            user {
              id
              userId
            }
          }
          recruitmentLevels {
            id
            name
          }
          owner {
            id
            userId
            name
            avatar
          }
          skills {
            id
            name
          }
          categories {
            id
            name
          }
        }
      }
    `,
    variables: { slug: params?.slug.toString() },
  });

  const title = data.room.title;
  const name = params.slug;
  const url = decodeURI(
    `https://ogp-mu.vercel.app/${encodeURI(title)}.${encodeURI(name)}.png`
  );

  return {
    props: {
      url,
      title,
      data,
      roomLoading,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
