import React from "react";
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import {
  CategorySet,
  convertToCategoryArray,
} from "../../components/category/category-set";
import { Heading } from "../../components/heading/heading";
import { Template } from "../../components/template/template";
import PeopleIcon from "../../assets/icons/people.svg";
import {
  convertToSkillPochiSetArray,
  LanguagePochiSet,
} from "../../components/language/language-pochi-set";
import { Button } from "../../components/button";
import Link from "next/link";
import { AvatarWithName } from "../../components/avatar/avatar-with-name";
import { useTeamDetail } from "../../hooks/useRoomDetail";
import { SimpleDialog } from "../../components/dialog/simple-dialog";
import { AvatarLink } from "../../components/avatar/avatar-link";
import ReactMarkdown from "react-markdown";

export default function ShowRoom() {
  const {
    onJoin,
    onLeave,
    onApply,
    iCanApply,
    iCanEdit,
    iCanJoin,
    iCanLeave,
    iAmApplying,
    isLimitOfRecruit,
    room,
    roomId,
    dialogState,
    dialogSetter,
    loading,
  } = useTeamDetail();

  if (loading) return <p>Loading...</p>;
  if (!room) return <p>データがありません</p>;

  return (
    <Template className="p-10">
      <div className="flex space-x-10">
        <Card className="p-8 flex-1">
          <SimpleDialog
            isOpen={dialogState.joinRoomDialogIsOpened}
            onClose={dialogSetter.onCloseJoinDialog}
            onClick={onJoin}
            buttonText="参加する"
            title="このルームに参加しますか"
          />
          <SimpleDialog
            isOpen={dialogState.leaveRoomDialogIsOpened}
            onClose={dialogSetter.onCloseLeaveDialog}
            onClick={onLeave}
            buttonText="脱退する"
            title="このルームから脱退しますか"
          />
          <SimpleDialog
            isOpen={dialogState.applyRoomDialogIsOpened}
            onClose={dialogSetter.onCloseApplyDialog}
            onClick={onApply}
            buttonText="申請する"
            title="このルームに参加申請しますか"
          />

          <div className="flex justify-between">
            <div className="flex-1">
              <CategorySet
                categories={convertToCategoryArray(room.categories)}
                className="mb-4"
              />

              <div className="flex items-center space-x-3">
                <div>
                  <Avatar src={room.icon || ""} size="large" />
                </div>
                <Heading as="h1Big">{room.title}</Heading>
              </div>
            </div>

            <div className="flex flex-col space-y-3 w-32">
              {isLimitOfRecruit && (
                <Button disabled={true} className="h-16">
                  現在参加できません
                </Button>
              )}
              {iCanEdit && (
                <Link href="/room/edit/[id]" as={`/room/edit/${roomId}`}>
                  <Button>編集する</Button>
                </Link>
              )}
              {iCanApply && (
                <Button onClick={dialogSetter.onClickApplyButton}>
                  申請する
                </Button>
              )}
              {iAmApplying && room.isRequired && (
                <Button
                  onClick={dialogSetter.onClickApplyButton}
                  disabled={true}
                >
                  申請中です
                </Button>
              )}
              {iCanJoin && (
                <Button onClick={dialogSetter.onClickJoinButton}>
                  参加する
                </Button>
              )}
              {iCanLeave && (
                <Button
                  variant="outline"
                  onClick={dialogSetter.onClickLeaveButton}
                >
                  脱退する
                </Button>
              )}
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex items-center space-x-8">
            <span className="flex items-center space-x-3">
              <p className="font-bold">人数</p>
              <span className="flex items-center space-x-3">
                <PeopleIcon />
                <span>
                  {room.members?.length}/{room.recruitNumbers}
                </span>
              </span>
            </span>

            <span className="flex items-center space-x-3">
              <p className="font-bold">オーナー</p>
              <AvatarWithName
                src={room.owner.avatar || ""}
                userId={room.owner.userId}
                name={room.owner.name}
                size="small"
              />
            </span>

            <span className="flex items-center space-x-3">
              <p className="font-bold">ルーム名</p>
              <span>{room.name}</span>
            </span>
          </div>

          <div className="space-y-2 mt-8">
            <div>
              <ReactMarkdown>{room.description}</ReactMarkdown>
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <Heading as="h2">使用するスキル</Heading>

            <LanguagePochiSet
              languages={convertToSkillPochiSetArray(room.skills)}
            />
          </div>
        </Card>

        <div className="divide-y divide-black-100 w-1/5 space-y-2">
          <div>
            <Heading as="h3" className="mb-2">
              メンバー
            </Heading>

            <div className="flex flex-wrap">
              {room.members?.map((member) => (
                <AvatarLink {...member} key={member.id} size="small" />
              ))}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </Template>
  );
}
