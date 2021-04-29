/* ルーム作成ページ */
import React, { useMemo } from "react";
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
import { TEXT_INPUT_ERRORS } from "../hooks/useTextInput";

const betweenH2 = "space-y-2";

export default function CreateRoom() {
  const {
    onClickFileInput,
    onChangeFileInput,
    onSubmit,
    onChangeType,
    searchConditions,
    setter,
    state,
    isDisabled,
    form,
    isPrivateError,
  } = useCreateRoom();
  const { data } = useCreateRoomPageQuery();

  useAuthGuard({});

  const skills = data?.skills || [];

  const slugErrors = useMemo(() => {
    return form.slug.errors.filter(
      (error) => error !== TEXT_INPUT_ERRORS.REQUIRED
    );
  }, [form.slug.errors]);

  return (
    <Template className="flex flex-col lg:py-10 lg:space-x-10 lg:flex-row lg:px-28">
      <Meta title={"ルーム作成 | CloudCircle"} />

      <div className="flex-1">
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

              <div className="flex flex-col lg:flex-row">
                <div className={`lg:w-1/4 ${betweenH2}`}>
                  <TextInput
                    name="ルームID"
                    required
                    placeholder="ルームID"
                    onChange={form.slug.onChange}
                    errors={form.slug.errors}
                  />
                  <ul>
                    {slugErrors.map((error) => (
                      <li key={error.code} className="text-red-500">
                        ・{error.message}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`w-full mt mt-10 lg:mt-0 lg:ml-8 ${betweenH2}`}>
                  <TextInput
                    name="ルーム名"
                    required
                    placeholder="ルーム名を入力"
                    onChange={form.name.onChange}
                    errors={form.name.errors}
                  />
                </div>
              </div>
              <div className={`w-full mt-10 ${betweenH2}`}>
                <TextInput
                  name="募集タイトル"
                  required
                  placeholder="メンバー募集タイトル"
                  className="w-2/3"
                  onChange={form.title.onChange}
                  errors={form.title.errors}
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
                <ul>
                  {form.categories.errors.map((error) => (
                    <li key={error.code} className="text-red-500">
                      ・{error.message}
                    </li>
                  ))}
                </ul>
                <div>
                  {data?.categories.map((category, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      onChange={() => form.categories.onChange(category.id)}
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className={`${betweenH2} h-64`}>
                <div className="h-full">
                  <TextArea
                    name="ルームについて"
                    required
                    placeholder="ルームについて（Markdown記法）&#13;&#10;最初の一文がルーム一覧の説明文に表示されます。"
                    className="h-56 mt-3 "
                    onChange={form.description.onChange}
                    errors={form.description.errors}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isDisabled}
                className="hidden lg:inline-flex"
              >
                作成する
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* 右側のカード */}
      <div className="mt-10 lg:mt-0">
        <Card className="p-8">
          <span className="flex">
            <Heading as="h1Small">ルームへの申請</Heading>
            <span className="text-red-500">*</span>
          </span>
          <p className="mt-1 text-red-500">{isPrivateError}</p>
          <div className="flex mt-3 space-x-8">
            <Radio
              text="なし"
              name="apply"
              value={ROOM_TYPE.PUBLIC}
              checked={state.isPrivate === ROOM_TYPE.PUBLIC}
              onChange={() => setter.setIsPrivate(ROOM_TYPE.PUBLIC)}
            />
            <Radio
              text="あり"
              name="apply"
              value={ROOM_TYPE.PRIVATE}
              checked={state.isPrivate === ROOM_TYPE.PRIVATE}
              onChange={() => setter.setIsPrivate(ROOM_TYPE.PRIVATE)}
            />
          </div>
          {state.isPrivate === "1" && (
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

      <Button
        onClick={onSubmit}
        disabled={isDisabled}
        className="my-10 lg:hidden"
      >
        作成する
      </Button>
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
