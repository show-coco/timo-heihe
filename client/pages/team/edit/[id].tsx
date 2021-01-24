import React from "react";
import { AutoComplate } from "../../../components/auto-complate/auto-complate";
import { Avatar } from "../../../components/avatar/avatar";
import { Card } from "../../../components/card/card";
import { Checkbox } from "../../../components/checkbox/checkbox";
import { FileInput } from "../../../components/file-input/file-inpute";
import { Heading } from "../../../components/heading/heading";
import { LanguagePochiSet } from "../../../components/language/language-pochi-set";
import { NumberInput } from "../../../components/number-input/number-input";
import { Radio } from "../../../components/radio/radio";
import { Template } from "../../../components/template/template";
import { TextInput } from "../../../components/text-input/text-input";
import GithubIcon from "../../../assets/icons/github.svg";
import { Button } from "../../../components/button";
import { useEditTeam } from "../../../hooks/useEditTeam";
import {
  convertToACData,
  convertToSkillPochiSetArray,
} from "../../create-team";

const betweenH2 = "space-y-2";

export default function EditTeam() {
  const { formState, file, setter, skills, categories } = useEditTeam();

  console.log(formState);

  return (
    <Template>
      <Card className="p-8">
        <form onSubmit={() => {}}>
          <div className="space-y-10">
            <Heading as="h1Small">新しいチームを作成する</Heading>

            <div className={betweenH2}>
              <Heading as="h2">チームアイコン</Heading>

              <div className="flex items-center space-x-7">
                <Avatar src={formState.imageUrl || ""} />
                <FileInput
                  ref={file.fileRef}
                  onClick={file.onClickFileInput}
                  onChange={file.onChangeFileInput}
                />
              </div>
            </div>

            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">チーム名</Heading>
                <span className="text-red-500">*</span>
              </span>

              <TextInput
                placeholder="チーム名を入力"
                name="title"
                value={formState.title}
                onChange={(e) => setter.setTitle(e.target.value)}
              />
            </div>

            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">チームの説明</Heading>
                <span className="text-red-500">*</span>
              </span>

              <TextInput
                placeholder="チームの説明を入力"
                name="description"
                value={formState.description}
                className="w-2/3"
                onChange={(e) => setter.setDescription(e.target.value)}
              />
            </div>

            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">募集人数</Heading>
                <span className="text-red-500">*</span>
              </span>

              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <NumberInput
                  value={formState.recruitNumber}
                  setValue={setter.setRecruitNumber}
                />
              </div>
            </div>

            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">参加時の申請</Heading>
                <span className="text-red-500">*</span>
              </span>

              <div className="space-x-8 flex">
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

            <div className={`flex flex-col flex-wrap w-2/3`}>
              <Heading as="h2">カテゴリー</Heading>

              <div>
                {categories.map((category, i) => (
                  <Checkbox
                    key={i}
                    className="mr-4 mt-4"
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
              <Heading as="h2">使用するスキル</Heading>

              <AutoComplate
                data={convertToACData(skills)}
                placeholder="スキルを検索"
                setSelected={setter.setSkills}
                selectedData={formState.selectedSkills}
              />
              <div>
                <LanguagePochiSet
                  languages={convertToSkillPochiSetArray(
                    formState.selectedSkills
                  )}
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

            <Button type="submit">保存する</Button>
          </div>
        </form>
      </Card>
    </Template>
  );
}
