import React from "react";
import { AutoComplate } from "../../../components/auto-complate/auto-complate";
import { Avatar } from "../../../components/avatar/avatar";
import { Card } from "../../../components/card/card";
import { Checkbox } from "../../../components/checkbox/checkbox";
import { FileInput } from "../../../components/file-input/file-inpute";
import { Heading } from "../../../components/heading/heading";
import { NumberInput } from "../../../components/number-input/number-input";
import { Radio } from "../../../components/radio/radio";
import { TextInput } from "../../../components/text-input/text-input";
import GithubIcon from "../../../assets/icons/github.svg";
import { Button } from "../../../components/button";
import { useEditTeam } from "../../../hooks/useEditRoom";
import {
  convertToACData,
  convertToSkillPochiSetArray,
} from "../../create-room";
import { EditableLanguagePochiSet } from "../../../components/language/editable-language-pochi-set";
import { TextArea } from "../../../components/text-area";
import { useAuthGuard } from "../../../hooks/useAuthGurad";
import { Template } from "../../../components/template/app/template";

const betweenH2 = "space-y-2";

export default function EditRoom() {
  const {
    formState,
    file,
    setter,
    skills,
    categories,
    roomTypes,
    data,
    onSubmit,
  } = useEditTeam();

  useAuthGuard({ ownerId: data?.room.owner.id });

  console.log(formState);

  return (
    <Template className="p-10">
      <div className="flex space-x-10">
        <Card className="flex-1 p-8">
          <form onSubmit={onSubmit}>
            <div className="space-y-10">
              <Heading as="h1Small">ルーム情報を編集する</Heading>
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

              <div className="flex space-x-6">
                <div className={`${betweenH2} flex-1`}>
                  <span className="flex">
                    <Heading as="h2">ルームID</Heading>
                    <span className="text-red-500">*</span>
                  </span>

                  <TextInput
                    placeholder="ルームIDを入力"
                    value={formState.slug}
                    onChange={(e) => setter.setSlug(e.target.value)}
                  />
                </div>

                <div className={`${betweenH2} w-2/3`}>
                  <span className="flex">
                    <Heading as="h2">ルーム名</Heading>
                    <span className="text-red-500">*</span>
                  </span>

                  <TextInput
                    placeholder="ルーム名を入力"
                    value={formState.name}
                    onChange={(e) => setter.setName(e.target.value)}
                  />
                </div>
              </div>

              <div className={betweenH2}>
                <span className="flex">
                  <Heading as="h2">メンバー募集タイトル</Heading>
                  <span className="text-red-500">*</span>
                </span>

                <TextInput
                  placeholder="メンバー募集タイトル"
                  className="w-2/3"
                  value={formState.title}
                  onChange={(e) => setter.setTitle(e.target.value)}
                />
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
                <Heading as="h2">カテゴリー</Heading>

                <div>
                  {categories.map((category, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={category.id?.toString()}
                      checked={formState.categories.includes(category.id || -1)}
                      onChange={(e) =>
                        setter.onChangeCategories(
                          e,
                          Number(e.currentTarget.value)
                        )
                      }
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className={betweenH2}>
                <span className="flex">
                  <Heading as="h2">ルームの説明</Heading>
                  <span className="text-red-500">*</span>
                </span>

                <div className="h-96">
                  <TextArea
                    placeholder="ルームについて"
                    value={formState.description}
                    onChange={(e) => setter.setDescription(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit">保存する</Button>
            </div>
          </form>
        </Card>

        <div className="w-1/3 space-y-10">
          <Card>
            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">参加時の申請</Heading>
                <span className="text-red-500">*</span>
              </span>

              <div className="flex space-x-8">
                <Radio
                  checked={formState.isRequired === "1"}
                  text="なし"
                  name="apply"
                  value="1"
                  onChange={(e) => setter.setIsRequired(e.target.value)}
                />
                <Radio
                  checked={formState.isRequired === "2"}
                  text="あり"
                  name="apply"
                  value="2"
                  onChange={(e) => setter.setIsRequired(e.target.value)}
                />
              </div>
            </div>

            <div className={betweenH2}>
              <Heading as="h2">Githubリポジトリ</Heading>

              <div className="flex items-center space-x-2">
                <GithubIcon height="30px" />
                <TextInput
                  placeholder="URLを入力"
                  className="w-1/2"
                  value={formState.repositoryUrl}
                  onChange={(e) => setter.setRespositoryUrl(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card>
            <Heading as="h3">募集するレベル帯</Heading>
          </Card>

          <Card>
            <div className={betweenH2}>
              <Heading as="h2">使用するスキル</Heading>

              <AutoComplate
                data={convertToACData(skills)}
                placeholder="スキルを検索"
                setSelected={setter.setSkills}
                selectedData={formState.selectedSkills}
              />
              <div>
                <EditableLanguagePochiSet
                  languages={convertToSkillPochiSetArray(
                    formState.selectedSkills
                  )}
                  setSelected={setter.setSkills}
                  selectedData={formState.selectedSkills}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Template>
  );
}
