import React, { FC } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";
import { FetchSkillQuery, FetchCategoryQuery } from "../../generated/types";
type UseSearch = {
  handleSubmit: () => void;
  handleChangeCategories: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangeSkills: (e: React.FormEvent<HTMLInputElement>) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  skillData?: FetchSkillQuery;
  categoryData?: FetchCategoryQuery;
  setRecruitNumbers: React.Dispatch<React.SetStateAction<number>>;
  recruitNumbers: number;
};
export const SearchArea: FC<UseSearch> = ({
  handleSubmit,
  handleChangeCategories,
  handleChangeSkills,
  setName,
  name,
  skillData,
  categoryData,
  setRecruitNumbers,
  recruitNumbers,
}: UseSearch) => {
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
          <NumberInput value={recruitNumbers} setValue={setRecruitNumbers} />
        </div>

        <Heading as="h2" className="py-4">
          技術で絞る
        </Heading>
        <div>
          {skillData?.skills.map((skill, i) => (
            <Checkbox
              key={i}
              className="mr-4 mt-4"
              value={skill.id?.toString()}
              onChange={(e) => handleChangeSkills(e)}
            >
              {skill.name}
            </Checkbox>
          ))}
        </div>

        <Heading as="h2" className="py-4">
          カテゴリーで絞る
        </Heading>
        <div>
          {categoryData?.categories.map((category, i) => (
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
