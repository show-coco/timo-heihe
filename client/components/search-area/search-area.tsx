import React, { FC } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";
import { UseSearch } from "../../hooks/useSearchTeams";

type Props = Omit<
  UseSearch,
  "error" | "loading" | "teamsData" | "typeId" | "setTypeId"
>;

export const SearchArea: FC<Props> = ({
  setName,
  handleSubmit,
  handleChangeCategories,
  handleChangeSkills,
  setRecruitNumbers,
  name,
  skillIds,
  categoryAndSkillData,
  recruitNumbers,
}: Props) => {
  return (
    <div className="mt-5 pl-10">
      <div className="bg-blue-550 text-center rounded-t-md">
        <TextInput
          onChange={(e) => setName(e.target.value)}
          className="w-9/12 my-6"
          placeholder="チーム名で検索する"
          value={name}
        />
      </div>
      <div className="bg-white px-8">
        <Heading as="h2" className="py-4">
          所属人数で絞る
        </Heading>
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <NumberInput
            value={recruitNumbers}
            setValue={setRecruitNumbers}
            step={5}
          />
        </div>

        <Heading as="h2" className="py-4">
          技術で絞る
        </Heading>
        <div>
          {categoryAndSkillData?.skills.map((skill, i) => (
            <Checkbox
              key={i}
              className="mr-4 mt-4"
              value={skill.id?.toString()}
              onChange={(e) => handleChangeSkills(e)}
              checked={skillIds.some(
                (selectedSkillId) => selectedSkillId === skill.id
              )}
            >
              {skill.name}
            </Checkbox>
          ))}
        </div>

        <Heading as="h2" className="py-4">
          カテゴリーで絞る
        </Heading>
        <div>
          {categoryAndSkillData?.categories.map((category, i) => (
            <Checkbox
              key={i}
              className="mr-4 mt-4"
              value={category.id?.toString()}
              onChange={(e) => handleChangeCategories(e)}
            >
              {category.name}
            </Checkbox>
          ))}
        </div>

        <div className="text-center p-8">
          <Button
            onClick={handleSubmit}
            size="medium"
            className="px-10"
            type="submit"
          >
            検索
          </Button>
        </div>
      </div>
    </div>
  );
};
