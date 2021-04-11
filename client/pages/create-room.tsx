/* ルーム作成ページ */
import React from "react";
import { SkillModel, useCreateRoomPageQuery } from "../generated/types";
/* Components */
import { Card } from "../components/card/card";
import { Heading } from "../components/heading/heading";
import { Avatar } from "../components/avatar/avatar";
import { FileInput } from "../components/file-input/file-inpute";
import { TextInput } from "../components/text-input/text-input";
import { Radio } from "../components/radio/radio";
import { Checkbox } from "../components/checkbox/checkbox";
import { Button } from "../components/button";
import { TextArea } from "../components/text-area";
import { Template } from "../components/template/app/template";
import { OperationTag } from "../components/tag/operation";
import { Meta } from "../components/meta";
import { EditableSkillPochiSet } from "../components/skill/editable-skill-pochi-set";
import {
  ACSelectedData,
  AutoComplate,
} from "../components/auto-complate/auto-complate";
/* Hooks */
import { useAuthGuard } from "../hooks/useAuthGurad";
import { useCreateRoom, ROOM_TYPE } from "../hooks/useCreateRoom";
/* Icons */
import GithubIcon from "../assets/icons/github.svg";

const betweenH2 = "space-y-2";

export default function CreateRoom() {
  const {
    onClickFileInput,
    onChangeFileInput,
    onSubmit,
    onChangeCategories,
    onChangeType,
    searchConditions,
    setter,
    state,
    isDisabled,
    error,
  } = useCreateRoom();
  const { data } = useCreateRoomPageQuery();

  useAuthGuard({});

  const skills = data?.skills || [];

  return (
    <Template className="grid grid-cols-8 gap-8 p-10 px-28">
      <Meta title={"ルーム作成 | CloudCircle"} />

      <div className="col-span-5">
        {/*左側のカード */}
        <Card className="p-8">
          <form onSubmit={onSubmit}>
            <div className="space-y-10">
              <Heading as="h1Small">新しいルームを作成する</Heading>
              <div className={betweenH2}>
                <Heading as="h2">ルームアイコン</Heading>
                <div className="flex items-center space-x-7">
                  <Avatar src={state.imageUrl} />
                  <FileInput
                    ref={state.fileRef}
                    onClick={onClickFileInput}
                    onChange={onChangeFileInput}
                  />
                </div>
              </div>

              <div className="flex">
                <div className={`w-1/4 ${betweenH2}`}>
                  <TextInput
                    name="ルームID"
                    required
                    placeholder="ルームID"
                    onChange={(e) => setter.setSlug(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500">入力は半角数字のみです。</p>
                  )}
                </div>

                <div className={`w-full ml-8 ${betweenH2}`}>
                  <TextInput
                    name="ルーム名"
                    required
                    placeholder="ルーム名を入力"
                    onChange={(e) => setter.setName(e.target.value)}
                  />
                </div>
              </div>
              <div className={`w-full mt-10 ${betweenH2}`}>
                <TextInput
                  name="募集タイトル"
                  required
                  placeholder="メンバー募集タイトル"
                  className="w-2/3"
                  onChange={(e) => setter.setTitle(e.target.value)}
                />
              </div>

              <div className={`flex flex-col flex-wrap w-2/3`}>
                <Heading as="h2">ルームタイプ</Heading>

                <div>
                  {data?.roomTypes.map((type, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={type.id}
                      onChange={(e) => onChangeType(e, type.id)}
                    >
                      {type.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className={`flex flex-col flex-wrap w-2/3`}>
                <span className="flex">
                  <Heading as="h2">カテゴリー</Heading>
                  <span className="text-red-500">*</span>
                </span>
                <div>
                  {data?.categories.map((category, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={category.id?.toString()}
                      onChange={(e) =>
                        onChangeCategories(e, Number(e.currentTarget.value))
                      }
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div className={betweenH2}>
                <div className="w-2/3 h-52">
                  <TextArea
                    name="ルームについて"
                    required
                    placeholder="ルームについて（Markdown記法）&#13;&#10;最初の一文がルーム一覧の説明文に表示されます。"
                    className="w-2/3 mt-3"
                    onChange={(e) => setter.setDescription(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isDisabled}>
                作成する
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* 右側のカード */}
      <div className="col-span-3">
        <Card className="p-8">
          <span className="flex mb-3">
            <Heading as="h1Small">ルームへの申請</Heading>
            <span className="text-red-500">*</span>
          </span>
          <div className="flex space-x-8">
            <Radio
              text="なし"
              name="apply"
              value={ROOM_TYPE.PUBLIC}
              onChange={() => setter.setIsRequired(ROOM_TYPE.PUBLIC)}
            />
            <Radio
              text="あり"
              name="apply"
              value={ROOM_TYPE.PRIVATE}
              onChange={() => setter.setIsRequired(ROOM_TYPE.PRIVATE)}
            />
          </div>
          {state.isRequired === "1" && (
            <div className={`${betweenH2} mt-4`}>
              <TextInput
                name="招待URL"
                placeholder="DiscordやSlackの招待URL"
                onChange={(e) => setter.setRespositoryUrl(e.target.value)}
              />
            </div>
          )}
          <div className={`${betweenH2} mt-4`}>
            <TextInput
              name="Githubリポジトリ"
              placeholder="URLを入力"
              icon={<GithubIcon height="30px" />}
              onChange={(e) => setter.setRespositoryUrl(e.target.value)}
            />
          </div>
        </Card>

        {/*  募集するレベル帯 */}
        <Card className="p-8 mt-10">
          <Heading as="h2" className="pb-4">
            募集レベル
          </Heading>
          <div>
            {searchConditions?.recruitmentLevels.map((level) => (
              <OperationTag
                id={level.id}
                name={level.name}
                selectedItemIds={state.recruiementLevels}
                setIsSelected={setter.setRecruiementLevels}
                isSelected={state.recruiementLevels.includes(level.id)}
                key={level.id}
              />
            ))}
          </div>
          {/* <div className={`${betweenH2} mt-10`}>
            <TextInput
              name="募集する役割"
              placeholder="フロントエンドエンジニア "
              // onChange={(e) => setRespositoryUrl(e.target.value)}
            />
          </div> */}
        </Card>

        {/*  使用するスキル */}
        <Card className="p-8 mt-10">
          <div className={betweenH2}>
            <Heading as="h2">使用するスキル</Heading>

            <AutoComplate
              data={convertToACData(skills)}
              placeholder="スキルを検索"
              setSelected={setter.setSkills}
              selectedData={state.selectedSkills}
            />
            <EditableSkillPochiSet
              skills={convertToSkillPochiSetArray(state.selectedSkills)}
              setSelected={setter.setSkills}
              selectedData={state.selectedSkills}
            />
          </div>
        </Card>
      </div>
    </Template>
  );
}

export const convertToACData = (skills: Pick<SkillModel, "id" | "name">[]) => {
  return skills.map((skill) => ({
    id: skill.id.toString(),
    name: skill.name,
  }));
};

export const convertToSkillPochiSetArray = (skills: ACSelectedData[]) => {
  return skills.map((skill) => skill.name);
};
