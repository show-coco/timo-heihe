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
import { useTeamDetail } from "../../hooks/useTeamDetail";
import { SimpleDialog } from "../../components/dialog/simple-dialog";

export default function ShowTeam() {
  const {
    onJoinTeam,
    onLeaveTeam,
    onApplyTeam,
    iAmJoining,
    iAmApplying,
    iAmOwner,
    team,
    teamId,
    dialogState,
    dialogSetter,
  } = useTeamDetail();

  if (!team) return <p>データがありません</p>;

  return (
    <Template>
      <Card className="p-8">
        <SimpleDialog
          isOpen={dialogState.joinTeamDialogIsOpened}
          onClose={dialogSetter.onCloseJoinDialog}
          onClick={onJoinTeam}
          buttonText="参加する"
          title="このチームに参加しますか"
        />
        <SimpleDialog
          isOpen={dialogState.leaveTeamDialogIsOpened}
          onClose={dialogSetter.onCloseLeaveDialog}
          onClick={onLeaveTeam}
          buttonText="脱退する"
          title="このチームから脱退しますか"
        />
        <SimpleDialog
          isOpen={dialogState.applyTeamDialogIsOpened}
          onClose={dialogSetter.onCloseApplyDialog}
          onClick={onApplyTeam}
          buttonText="申請する"
          title="このチームに参加申請しますか"
        />

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
              <Link href="/team/edit/[id]" as={`/team/edit/${teamId}`}>
                <Button>編集する</Button>
              </Link>
            )}
            {!iAmApplying && team.isRequired && (
              <Button onClick={dialogSetter.onClickApplyButton}>
                申請する
              </Button>
            )}
            {iAmApplying && team.isRequired && (
              <Button onClick={dialogSetter.onClickApplyButton} disabled={true}>
                申請中です
              </Button>
            )}
            {!iAmJoining && !team.isRequired && (
              <Button onClick={dialogSetter.onClickJoinButton}>参加する</Button>
            )}
            {iAmJoining && (
              <Button
                variant="outline"
                onClick={dialogSetter.onClickLeaveButton}
              >
                脱退する
              </Button>
            )}
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
            <AvatarWithName
              src={team.owner.avatar || ""}
              userId={team.owner.id}
              name={team.owner.name}
              size="small"
            />
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
