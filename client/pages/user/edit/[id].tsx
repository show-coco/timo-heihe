/* ユーザー編集ページ */
import React from "react";
/* Components */
import { Avatar } from "../../../components/avatar/avatar";
import { Card } from "../../../components/card/card";
import { Heading } from "../../../components/heading/heading";
import { TextInput } from "../../../components/text-input/text-input";
import { useEditUser } from "../../../hooks/useEditUser";
import { FileInput } from "../../../components/file-input/file-inpute";
import { AutoComplate } from "../../../components/auto-complate/auto-complate";
import { Button } from "../../../components/button";
import { EditableSkillPochiSet } from "../../../components/skill/editable-skill-pochi-set";
import { Template } from "../../../components/template/app/template";
import { TextArea } from "../../../components/text-area";
import {
  convertToACData,
  convertToSkillPochiSetArray,
} from "../../create-room";
/* Icons */
import TwitterIcon from "../../../assets/icons/twitter.svg";
import GithubIcon from "../../../assets/icons/github.svg";
/* Hooks */
import { useAuthGuard } from "../../../hooks/useAuthGurad";

export default function EditUser() {
  const {
    form,
    file,
    setter,
    skills,
    disabled,
    userInfoLoading,
    updateUserLoading,
    onSubmit,
  } = useEditUser();

  useAuthGuard({});

  return (
    <Template className="p-10">
      <form onSubmit={onSubmit}>
        <Card className="p-8 space-y-10">
          <div className="flex items-center space-x-7">
            <Avatar src={form.imageUrl} size="large" />
            <FileInput
              ref={file.fileRef}
              onClick={file.onClickFileInput}
              onChange={file.onChangeFileInput}
            />
          </div>

          <div>
            <Heading as="h2">ユーザ名</Heading>

            <div>
              <TextInput
                value={form.userName.value}
                onChange={form.userName.onChange}
                errors={form.userName.errors}
              />
              <ul>
                {form.userName.errors.map((error) => (
                  <li key={error.code} className="text-red-500">
                    ・{error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <Heading as="h2">ユーザID</Heading>
            <span className="flex items-center">
              @
              <TextInput
                value={form.userId.value}
                className="w-2/3 ml-2"
                onChange={form.userId.onChange}
              />
            </span>
            <ul>
              {form.userId.errors.map((error) => (
                <li key={error.code} className="text-red-500">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center">
              <Heading as="h2">自己紹介</Heading>
              <span className="ml-3 text-gray-400">Markdown</span>
            </div>
            <div className="h-96">
              <TextArea
                value={form.introduction.value}
                placeholder="自己紹介文を設定してください"
                onChange={form.introduction.onChange}
                className="h-80"
              />
            </div>
            <div>
              <ul>
                {form.introduction.errors.map((error) => (
                  <li key={error.code} className="text-red-500">
                    ・{error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Heading as="h2">外部サービス</Heading>

            <div className="flex items-center space-x-2">
              <GithubIcon />
              <span className="pl-1">@</span>
              <TextInput
                value={form.githubId.value}
                onChange={form.githubId.onChange}
              />
              <div>
                <ul>
                  {form.githubId.errors.map((error) => (
                    <li key={error.code} className="text-red-500">
                      ・{error.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TwitterIcon class="bg-blue-400 rounded-full" />
              <span>@</span>
              <TextInput
                value={form.twitterId.value}
                onChange={form.twitterId.onChange}
              />
              <div>
                <ul>
                  {form.twitterId.errors.map((error) => (
                    <li key={error.code} className="text-red-500">
                      ・{error.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Heading as="h2">スキル</Heading>

            <AutoComplate
              data={convertToACData(skills)}
              placeholder="スキルを検索"
              setSelected={setter.setSkills}
              selectedData={form.selectedSkills}
            />
            <EditableSkillPochiSet
              skills={convertToSkillPochiSetArray(form.selectedSkills)}
              setSelected={setter.setSkills}
              selectedData={form.selectedSkills}
            />
          </div>

          <Button type="submit" disabled={disabled} loading={updateUserLoading}>
            保存する
          </Button>
        </Card>
      </form>
    </Template>
  );
}
