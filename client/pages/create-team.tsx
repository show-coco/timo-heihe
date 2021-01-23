import React from "react";
import { Avatar } from "../components/avatar/avatar";
import { Button } from "../components/button";
import { Card } from "../components/card/card";
import { Checkbox } from "../components/checkbox/checkbox";
import { Heading } from "../components/heading/heading";
import { NumberInput } from "../components/number-input/number-input";
import { Radio } from "../components/radio/radio";
import { Template } from "../components/template/template";
import GithubIcon from "../assets/icons/github.svg";
import { TextInput } from "../components/text-input/text-input";
import { FileInput } from "../components/file-input/file-inpute";
import { useCreateTeam } from "../hooks/useCreateTeam";

const betweenH2 = "space-y-2";

export default function CreateTeam() {
  const {
    setTitle,
    setRespositoryUrl,
    setSkills,
    setDescription,
    setPeopleNumber,
    onClickFileInput,
    onChangeFileInput,
    onSubmit,
    peopleNumber,
    fileRef,
    imageUrl,
  } = useCreateTeam();

  return (
    <Template>
      <Card className="p-8">
        <form onSubmit={onSubmit}>
          <div className="space-y-10">
            <Heading as="h1Small">新しいチームを作成する</Heading>

            <div className={betweenH2}>
              <Heading as="h2">チームアイコン</Heading>

              <div className="flex items-center space-x-7">
                <Avatar src={imageUrl} />
                <FileInput
                  ref={fileRef}
                  onClick={onClickFileInput}
                  onChange={onChangeFileInput}
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
                onChange={(e) => setTitle(e.target.value)}
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
                className="w-2/3"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">募集人数</Heading>
                <span className="text-red-500">*</span>
              </span>

              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <NumberInput value={peopleNumber} setValue={setPeopleNumber} />
              </div>
            </div>

            <div className={betweenH2}>
              <span className="flex">
                <Heading as="h2">参加時の申請</Heading>
                <span className="text-red-500">*</span>
              </span>

              <div className="space-x-8 flex">
                <Radio text="なし" name="apply" />
                <Radio text="あり" name="apply" />
              </div>
            </div>

            <div className={`flex flex-wrap w-2/3`}>
              <Heading as="h2">カテゴリー</Heading>

              <div>
                {categoriesMock.map((category, i) => (
                  <Checkbox key={i} className="mr-4 mt-4">
                    {category}
                  </Checkbox>
                ))}
              </div>
            </div>

            <div className={betweenH2}>
              <Heading as="h2">使用するスキル</Heading>

              <TextInput
                placeholder="検索する"
                name="skills"
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className={betweenH2}>
              <Heading as="h2">Githubリポジトリ</Heading>

              <div className="flex items-center space-x-2">
                <GithubIcon height="30px" />
                <TextInput
                  placeholder="URLを入力"
                  onChange={(e) => setRespositoryUrl(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit">作成する</Button>
          </div>
        </form>
      </Card>
    </Template>
  );
}

const categoriesMock = [
  "iOS",
  "Android",
  "Web",
  "ゲーム",
  "iOS",
  "Android",
  "Web",
  "ゲーム",
  "iOS",
  "Android",
  "Web",
  "ゲーム",
];
