import React from "react";
import { SearchConditionsQuery } from "../../generated/types";
import { ACSelectedData, AutoComplate } from "../auto-complate/auto-complate";
import { Button } from "../button";
import { Card } from "../card";
import { Checkbox } from "../checkbox/checkbox";
import { FileInput } from "../file-input/file-inpute";
import { Heading } from "../heading/heading";
import { Meta } from "../meta";
import { EditableSkillPochiSet } from "../skill/editable-skill-pochi-set";
import { OperationTag } from "../tag/operation";
import { Template } from "../template/app/template";
import { TextInput, TextInputProps } from "../text-input/text-input";
import GithubIcon from "../../assets/icons/github.svg";
import {
  convertToACData,
  convertToSkillPochiSetArray,
} from "../../pages/create-room";
import { UseFileInputReturn } from "../../hooks/useFileInput";
import { RoomTypeValueType, ROOM_TYPE } from "../../hooks/useCreateRoom";
import { Avatar } from "../avatar/avatar";
import { TextArea } from "../text-input/text-area";
import { Radio } from "../radio/radio";

const betweenH2 = "space-y-2";

type RoomEditFormProps = {
  buttonName: string;
  title: string;
  tabTitle: string;
  selectableData?: SearchConditionsQuery;
  loading: boolean;
  isDisabled: boolean;
  form: {
    slug: TextInputProps;
    title: TextInputProps;
    name: TextInputProps;
    description: TextInputProps;
    invitationUrl: TextInputProps;
    repositoryUrl: TextInputProps;
    file: UseFileInputReturn;
    type: {
      value: number[];
      onChangeType: (
        event: React.FormEvent<HTMLInputElement>,
        clickedTypeId: number
      ) => void;
      setTypes: React.Dispatch<React.SetStateAction<number[]>>;
    };
    isPrivate: {
      value: RoomTypeValueType;
      setIsPrivate: React.Dispatch<React.SetStateAction<RoomTypeValueType>>;
      isPrivateError: string;
    };
    skills: {
      value: ACSelectedData[];
      setSkills: React.Dispatch<React.SetStateAction<ACSelectedData[]>>;
    };
    recruiementLevels: {
      value: number[];
      setRecruiementLevels: React.Dispatch<React.SetStateAction<number[]>>;
    };
    onSubmit: (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>;
  };
};

export const EditRoomForm: React.VFC<RoomEditFormProps> = ({
  form,
  selectableData,
  isDisabled,
  loading,
  buttonName,
  title,
  tabTitle,
}: RoomEditFormProps) => {
  return (
    <Template className="flex flex-col lg:py-10 lg:space-x-10 lg:flex-row lg:px-28">
      <Meta title={`${tabTitle} | CloudCircle`} />

      <div className="flex-1">
        {/*左側のカード */}
        <Card className="p-8">
          <form onSubmit={form.onSubmit}>
            <div className="space-y-10">
              <Heading as="h1Small">{title}</Heading>
              <div className={betweenH2}>
                <Heading as="h2">ルームアイコン</Heading>

                <div className="flex items-center space-x-7">
                  <Avatar src={form.file.imageUrl} />
                  <FileInput
                    ref={form.file.fileRef}
                    onClick={form.file.onClickFileInput}
                    onChange={form.file.onChangeFileInput}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className={`lg:w-1/4 ${betweenH2}`}>
                  <TextInput {...form.slug} />
                </div>

                <div className={`w-full mt mt-10 lg:mt-0 lg:ml-8 ${betweenH2}`}>
                  <TextInput {...form.name} />
                </div>
              </div>

              <div className={`w-full mt-10 ${betweenH2}`}>
                <TextInput className="w-2/3" {...form.title} />
              </div>

              <div className={`flex flex-col flex-wrap w-2/3`}>
                <Heading as="h2">ルームタイプ</Heading>

                <div>
                  {selectableData?.roomTypes.map((type, i) => (
                    <Checkbox
                      key={i}
                      className="mt-4 mr-4"
                      value={type.id}
                      onChange={(e) => form.type.onChangeType(e, type.id)}
                    >
                      {type.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className={`${betweenH2} h-64`}>
                <div className="h-full">
                  <TextArea className="h-56 mt-3 " {...form.description} />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isDisabled}
                loading={loading}
                className="hidden lg:inline-flex"
              >
                {buttonName}
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
          <p className="mt-1 text-blue-500">{form.isPrivate.isPrivateError}</p>
          <div className="flex mt-3 space-x-8">
            <Radio
              text="なし"
              name="apply"
              value={ROOM_TYPE.PUBLIC}
              checked={form.isPrivate.value === ROOM_TYPE.PUBLIC}
              onChange={() => form.isPrivate.setIsPrivate(ROOM_TYPE.PUBLIC)}
            />
            <Radio
              text="あり"
              name="apply"
              value={ROOM_TYPE.PRIVATE}
              checked={form.isPrivate.value === ROOM_TYPE.PRIVATE}
              onChange={() => form.isPrivate.setIsPrivate(ROOM_TYPE.PRIVATE)}
            />
          </div>
          {form.isPrivate.value === "1" && (
            <div>
              <div className={`${betweenH2} mt-4`}>
                <TextInput {...form.invitationUrl} />
              </div>
            </div>
          )}
          <div className={`${betweenH2} mt-4`}>
            <TextInput
              icon={<GithubIcon height="30px" />}
              {...form.repositoryUrl}
            />
          </div>
        </Card>

        {/*  募集するレベル帯 */}
        <Card className="p-8 mt-10">
          <Heading as="h2" className="pb-4">
            募集レベル
          </Heading>
          <div>
            {selectableData?.recruitmentLevels.map((level) => (
              <OperationTag
                id={level.id}
                name={level.name}
                selectedItemIds={form.recruiementLevels.value}
                setIsSelected={form.recruiementLevels.setRecruiementLevels}
                isSelected={form.recruiementLevels.value.includes(level.id)}
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
              data={convertToACData(selectableData?.skills || [])}
              placeholder="スキルを検索"
              setSelected={form.skills.setSkills}
              selectedData={form.skills.value}
            />
            <EditableSkillPochiSet
              skills={convertToSkillPochiSetArray(form.skills.value)}
              setSelected={form.skills.setSkills}
              selectedData={form.skills.value}
            />
          </div>
        </Card>
      </div>

      <Button
        onClick={form.onSubmit}
        disabled={isDisabled}
        className="my-10 lg:hidden"
        loading={loading}
      >
        {buttonName}
      </Button>
    </Template>
  );
};
