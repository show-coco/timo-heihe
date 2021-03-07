import React, { useState } from "react";
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
import { useAuthContext } from "../../providers/useAuthContext";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../../components/login-modal";
import { MemberState } from "../../generated/types";
import { LeaveTeanModal } from "../../components/leave/modals/leave-team-modal";
// import { TextInput } from "../text-input/text-input";
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
    slug,
    room,
    dialogState,
    dialogSetter,
    loading,
  } = useTeamDetail();
  const { isAuthenticated } = useAuthContext();
  const { isOpen, onOpen, onClose } = useModal();
  const [isOpend, setIsOpend] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!room) return <p>データがありません</p>;

  // TODO: 人数計算の処理をサーバでやる
  const joiningCount = room?.members?.filter(
    (member) => member.memberState === MemberState.Joining
  ).length;

  return (
    <>
      <LoginModal isOpen={isOpen} onRequestClose={onClose} />

      <LeaveTeanModal
        isOpen={isOpend}
        onRequestClose={() => setIsOpend(!isOpend)}
      />

      <Template className="p-10">
        <div className="flex space-x-10">
          <Card className="flex-1 p-8">
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

              <div className="flex flex-col w-32 space-y-3">
                {isLimitOfRecruit && (
                  <Button disabled={true} className="h-16">
                    現在参加できません
                  </Button>
                )}
                {iCanEdit && (
                  <Link href="/room/edit/[slug]" as={`/room/edit/${slug}`}>
                    <Button>編集する</Button>
                  </Link>
                )}
                {iCanEdit && (
                  <Button
                    variant="outline"
                    colorScheme="red"
                    onClick={() => setIsOpend(true)}
                  >
                    脱退する
                  </Button>
                )}
                {iCanApply && (
                  <Button
                    onClick={
                      isAuthenticated ? dialogSetter.onClickApplyButton : onOpen
                    }
                  >
                    申請する
                  </Button>
                )}
                {iAmApplying && room.isRequired && (
                  <Button
                    onClick={
                      isAuthenticated ? dialogSetter.onClickApplyButton : onOpen
                    }
                    disabled={true}
                  >
                    申請中です
                  </Button>
                )}
                {iCanJoin && (
                  <Button
                    onClick={
                      isAuthenticated ? dialogSetter.onClickJoinButton : onOpen
                    }
                  >
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
                    {joiningCount}/{room.recruitNumbers}
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

            <div className="mt-8 space-y-2">
              <div className="markdown">
                <ReactMarkdown>{room.description}</ReactMarkdown>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <Heading as="h2">使用するスキル</Heading>

              <LanguagePochiSet
                languages={convertToSkillPochiSetArray(room.skills)}
              />
            </div>
          </Card>

          <div className="w-1/5 space-y-2 divide-y divide-black-100">
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
    </>
  );
}
