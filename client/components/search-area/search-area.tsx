import React, { useState, useEffect } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";
import {
  useFetchCategoryQuery,
  useFetchSkillQuery,
} from "../../generated/types";
import { useSearch } from "../../hooks/useSeach";
type SearchAreaPros = {};
export const SearchArea = () => {
  const { data: dataR } = useFetchCategoryQuery();

  const { data } = useFetchSkillQuery();
  const [RecruitNumber, setRecruitNumber] = useState(0);
  const [skills, setSkills] = useState<number>();
  const [teamName, setTeamName] = useState<string>("");
  const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedSkills, setCheckedSkills] = useState({});

  const handleChangeCategories = (e: React.FormEvent<HTMLInputElement>) => {
    setCheckedCategories({
      ...checkedCategories,
      [Number(e.currentTarget.value)]: (e.target as HTMLInputElement).checked,
    });
  };

  const handleChangeSkills = (e: React.FormEvent<HTMLInputElement>) => {
    setCheckedSkills({
      ...checkedSkills,
      [Number(e.currentTarget.value)]: (e.target as HTMLInputElement).checked,
    });
  };

  // デバック
  console.log("checkedItems: ", checkedCategories);
  console.log("checkedItems(スキル): ", checkedSkills);
  console.log("チームネーム: ", teamName);
  console.log("所属人数: ", RecruitNumber);

  return (
    <div className="mt-5 pl-10">
      {/* テキストインプットと背景青 */}
      <div className="bg-blue-550 text-center rounded-t-md">
        <TextInput
          onChange={(e) => setTeamName(e.target.value)}
          className="w-9/12 my-6"
          placeholder="チーム名で検索する"
          value={teamName}
        />
      </div>
      <div className="bg-white px-8">
        {/* 人数で絞る */}
        <Heading as="h2" className="py-4">
          所属人数で絞る
        </Heading>
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <NumberInput value={RecruitNumber} setValue={setRecruitNumber} />
        </div>
        {/* 技術で絞る */}
        <Heading as="h2" className="py-4">
          技術で絞る
        </Heading>
        <div>
          {data?.skills.map((skill, i) => (
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

        {/* カテゴリーで絞るで絞る */}
        <Heading as="h2" className="py-4">
          カテゴリーで絞る
        </Heading>
        <div>
          {dataR?.categories.map((category, i) => (
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

        {/* 検索ボタン */}
        <div className="text-center p-8">
          <Button size="medium" className="px-10" type="submit">
            検索
          </Button>
        </div>
      </div>
    </div>
  );
};
