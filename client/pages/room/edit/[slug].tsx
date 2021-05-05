import React, { useMemo } from "react";
import { AutoComplate } from "../../../components/auto-complate/auto-complate";
import { Avatar } from "../../../components/avatar/avatar";
import { Card } from "../../../components/card/card";
import { Checkbox } from "../../../components/checkbox/checkbox";
import { FileInput } from "../../../components/file-input/file-inpute";
import { Heading } from "../../../components/heading/heading";
import { Radio } from "../../../components/radio/radio";
import { TextInput } from "../../../components/text-input/text-input";
import GithubIcon from "../../../assets/icons/github.svg";
import { Button } from "../../../components/button";
import { useEditTeam } from "../../../hooks/useEditRoom";
import {
  convertToACData,
  convertToSkillPochiSetArray,
} from "../../create-room";
import { EditableSkillPochiSet } from "../../../components/skill/editable-skill-pochi-set";
import { TextArea } from "../../../components/text-area";
import { useAuthGuard } from "../../../hooks/useAuthGurad";
import { Template } from "../../../components/template/app/template";
import { OperationTag } from "../../../components/tag/operation";
import { TEXT_INPUT_ERRORS } from "../../../hooks/useTextInput";

const betweenH2 = "space-y-2";

export default function EditRoom() {
  const {
    formState,
    file,
    setter,
    skills,
    categories,
    roomTypes,
    ownerId,
    recruitmentLevels,
    form,
    isDisbaled,
    isPrivateError,
    onSubmit,
  } = useEditTeam();

  useAuthGuard({ ownerId });

  const slugErrors = useMemo(() => {
    return form.slug.errors.filter(
      (error) => error !== TEXT_INPUT_ERRORS.REQUIRED
    );
  }, [form.slug.errors]);

  return (
    <Template className="pt-10 lg:p-10">
      <Heading as="h1Big" className="pb-10 text-center">
        ルーム情報を編集する
      </Heading>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <Card className="flex-1 p-8">
          <form onSubmit={onSubmit}>
            <div className="space-y-10">
              <div className={betweenH2}>
                <Heading as="h2">ルームアイコン</Heading>

                <div className="flex items-center space-x-7">
                  <Avatar src={formState.imageUrl || ""} />
                  <FileInput
                    ref={file.fileRef}
                    onClick={file.onClickFileInput}
                    onChange={file.onChangeFileInput}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:space-x-6">
                <div className={`${betweenH2} flex-1`}>
                  <span className="flex">
                    <Heading as="h2">ルームID</Heading>
                    <span className="text-red-500">*</span>
                  </span>

                  <TextInput
                    placeholder="ルームIDを入力"
                    value={form.slug.value}
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

                <div className={`${betweenH2} lg:w-2/3 mt-10 lg:mt-0`}>
                  <span className="flex">
                    <Heading as="h2">ルーム名</Heading>
                    <span className="text-red-500">*</span>
                  </span>

                  <div className="flex flex-col">
                    <TextInput
                      placeholder="ルーム名を入力"
                      value={form.name.value}
                      onChange={form.name.onChange}
                      errors={form.name.errors}
                    />
                  </div>
                  <ul>
                    {form.name.errors.map((error) => (
                      <li key={error.code} className="text-red-500">
                        ・{error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={betweenH2}>
                <span className="flex">
                  <Heading as="h2">メンバー募集タイトル</Heading>
                  <span className="text-red-500">*</span>
                </span>

                <div className="flex flex-col">
                  <TextInput
                    placeholder="メンバー募集タイトル"
                    className="w-2/3"
                    value={form.title.value}
                    onChange={form.title.onChange}
                    errors={form.title.errors}
                  />
                  <ul>
                    {form.title.errors.map((error) => (
                      <li key={error.code} className="text-red-500">
                        ・{error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`flex flex-col flex-wrap w-2/3`}>
                <Heading as="h2">ルームタイプ</Heading>

                <div>
                  {roomTypes.map((type, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={type.id}
                      checked={formState.types.includes(type.id)}
                      onChange={(e) => setter.onChangeType(e, type.id)}
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
                  {categories.map((category, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={category.id?.toString()}
                      checked={form.categories.values.includes(
                        category.id || -1
                      )}
                      onChange={() => form.categories.onChange(category.id)}
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
                <ul>
                  {form.categories.errors.map((error) => (
                    <li key={error.code} className="text-red-500">
                      ・{error.message}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={betweenH2}>
                <span className="flex items-center">
                  <Heading as="h2">ルームの説明</Heading>
                  <span className="text-red-500">*</span>
                  <span className="ml-3 text-gray-400">Markdown</span>
                </span>

                <div className="h-72">
                  <TextArea
                    placeholder="ルームについて"
                    value={form.description.value}
                    onChange={form.description.onChange}
                    className="h-64"
                    errors={form.description.errors}
                  />
                </div>
                <ul>
                  {form.description.errors.map((error) => (
                    <li key={error.code} className="text-red-500">
                      ・{error.message}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="submit"
                className="hidden lg:inline-block"
                disabled={isDisbaled}
              >
                保存する
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-10">
          <Card className="space-y-5 p-7">
            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h3">参加時の申請</Heading>
                <span className="text-red-500">*</span>
              </span>

              <p className="mt-1 text-red-500">{isPrivateError}</p>

              <div className="flex space-x-8">
                <Radio
                  checked={formState.withApplication === "1"}
                  text="なし"
                  name="apply"
                  value="1"
                  onChange={(e) => setter.setWithApplication(e.target.value)}
                />
                <Radio
                  checked={formState.withApplication === "2"}
                  text="あり"
                  name="apply"
                  value="2"
                  onChange={(e) => setter.setWithApplication(e.target.value)}
                />
              </div>
            </div>

            {formState.withApplication === "1" && (
              <div className={betweenH2}>
                <Heading as="h3">招待URL</Heading>

                <TextInput
                  placeholder="SlackやDiscordの招待URL"
                  value={formState.invitationUrl}
                  onChange={(e) => setter.setInvitationUrl(e.target.value)}
                />
              </div>
            )}

            <div className={betweenH2}>
              <Heading as="h3">Githubリポジトリ</Heading>

              <div className="flex items-center space-x-2">
                <GithubIcon height="30px" />
                <div className="flex-1">
                  <TextInput
                    placeholder="GithubリポジトリのURL"
                    value={formState.repositoryUrl}
                    onChange={(e) => setter.setRespositoryUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-7 ${betweenH2}`}>
            <Heading as="h3">募集するレベル帯</Heading>

            <div className="flex flex-col lg:flex-row lg:flex-wrap">
              {recruitmentLevels.map((recruitmentLevel) => (
                <OperationTag
                  {...recruitmentLevel}
                  key={recruitmentLevel.id}
                  selectedItemIds={formState.recruitmentLevels}
                  isSelected={formState.recruitmentLevels.includes(
                    recruitmentLevel.id
                  )}
                  setIsSelected={setter.setRecruitmentLevels}
                />
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <div className={betweenH2}>
              <Heading as="h2">使用するスキル</Heading>

              <AutoComplate
                data={convertToACData(skills)}
                placeholder="スキルを検索"
                setSelected={setter.setSkills}
                selectedData={formState.selectedSkills}
              />
              <EditableSkillPochiSet
                skills={convertToSkillPochiSetArray(formState.selectedSkills)}
                setSelected={setter.setSkills}
                selectedData={formState.selectedSkills}
              />
            </div>
          </Card>
        </div>

        <Button
          onClick={onSubmit}
          className="inline-block my-10 lg:hidden"
          disabled={isDisbaled}
        >
          保存する
        </Button>
      </div>
    </Template>
  );
}
