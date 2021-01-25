import React from "react";
import { Avatar } from "../../../components/avatar/avatar";
import { Card } from "../../../components/card/card";
import { Heading } from "../../../components/heading/heading";
import { Template } from "../../../components/template/template";
import TwitterIcon from "../../../assets/icons/twitter.svg";
import GithubIcon from "../../../assets/icons/github.svg";
import { TextInput } from "../../../components/text-input/text-input";
import { useEditUser } from "../../../hooks/useEditUser";
import { FileInput } from "../../../components/file-input/file-inpute";
import { LanguagePochiSet } from "../../../components/language/language-pochi-set";
import {
  convertToACData,
  convertToSkillPochiSetArray,
} from "../../create-team";
import { AutoComplate } from "../../../components/auto-complate/auto-complate";

export default function EditUser() {
  const { formState, file, setter, skills } = useEditUser();

  return (
    <Template>
      <Card className="p-8 space-y-10">
        <div className="flex items-center space-x-7">
          <Avatar src={formState.imageUrl} size="large" />
          <FileInput
            ref={file.fileRef}
            onClick={file.onClickFileInput}
            onChange={file.onChangeFileInput}
          />
        </div>

        <div>
          <Heading as="h2">ユーザ名</Heading>
          <TextInput value={formState.userName} />
        </div>

        <div>
          <Heading as="h2">ユーザID</Heading>
          <span className="flex items-center">
            @<TextInput value={formState.userId} className="w-2/3 ml-2" />
          </span>
        </div>

        <div>
          <Heading as="h2">自己紹介</Heading>
          <TextInput
            className="w-2/3"
            value={formState.introduction}
            placeholder="自己紹介文を設定してください"
          />
        </div>

        <div className="space-y-3">
          <Heading as="h2">SNS</Heading>

          <div className="flex items-center space-x-2">
            <GithubIcon />
            <span className="pl-1">@</span>
            <TextInput value={formState.githubId} />
          </div>
          <div className="flex items-center space-x-2">
            <TwitterIcon class="bg-blue-400 rounded-full" />
            <span>@</span>
            <TextInput value={formState.twitterId} />
          </div>
        </div>

        <div className="space-y-2">
          <Heading as="h2">スキル</Heading>

          <AutoComplate
            data={convertToACData(skills)}
            placeholder="スキルを検索"
            setSelected={setter.setSkills}
            selectedData={formState.selectedSkills}
          />
          <LanguagePochiSet
            languages={convertToSkillPochiSetArray(formState.selectedSkills)}
          />
        </div>
      </Card>
    </Template>
  );
}
