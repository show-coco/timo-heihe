import React, { useState, useEffect } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";
import {
  useFetchCategoryQuery,
  useFetchSkillQuery,
  useSearchTeamQuery,
  SearchTeamQuery,
} from "../../generated/types";
import { useSearch } from "../../hooks/useSeach";
type SearchAreaPros = {};
export const SearchArea = () => {
  const { data: dataR } = useFetchCategoryQuery();
  const { data } = useFetchSkillQuery();

  const [recruitNumbers, setRecruitNumbers] = useState(0);
  const [name, setName] = useState<string>("");
  const [searchedTeams, setSearchedTemas] = useState<SearchTeamQuery>();
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [searchData, setSeacrhData] = useState({});
  const { data: dataS } = useSearchTeamQuery(searchData);

  const handleSubmit = () => {
    const Data = {
      variables: {
        input: {
          recruitNumbers,
          name,
          categoryIds: categoryIds.length ? categoryIds : null,
          skillIds: skillIds.length ? skillIds : null,
        },
      },
    };
    setSeacrhData(Data);
    setName("");
    setRecruitNumbers(0);
  };

  useEffect(() => {
    setSearchedTemas(dataS);
  }, [dataS]);

  const handleChangeCategories = (e: React.FormEvent<HTMLInputElement>) => {
    // チェック入れた挙動
    if ((e.target as HTMLInputElement).checked === true) {
      const duplicateDelteCategories = new Set([...categoryIds]);
      setCategoryIds([
        ...duplicateDelteCategories,
        Number(e.currentTarget.value),
      ]);
      // チェックを外した挙動
    } else if ((e.target as HTMLInputElement).checked === false) {
      const removeCheck = Number(e.currentTarget.value);
      const newCategories = categoryIds.filter((value) => value != removeCheck);
      setCategoryIds(newCategories);
    }
  };

  const handleChangeSkills = (e: React.FormEvent<HTMLInputElement>) => {
    // チェックを外した挙動
    if ((e.target as HTMLInputElement).checked === true) {
      const duplicateDelteSkill = new Set([...skillIds]);
      setSkillIds([...duplicateDelteSkill, Number(e.currentTarget.value)]);
      // チェック入れた挙動
    } else if ((e.target as HTMLInputElement).checked === false) {
      const removeCheck = Number(e.currentTarget.value);
      const newSkills = skillIds.filter((value) => value != removeCheck);
      setSkillIds(newSkills);
    }
  };

  // デバック
  console.log("checkedItems: ", categoryIds);
  console.log("checkedItems(スキル): ", skillIds);
  console.log("チームネーム: ", name);
  console.log("所属人数: ", recruitNumbers);

  return (
    <div className="mt-5 pl-10">
      {/* テキストインプットと背景青 */}
      <div className="bg-blue-550 text-center rounded-t-md">
        <TextInput
          onChange={(e) => setName(e.target.value)}
          className="w-9/12 my-6"
          placeholder="チーム名で検索する"
          value={name}
        />
      </div>
      <div className="bg-white px-8">
        {/* 人数で絞る */}
        <Heading as="h2" className="py-4">
          所属人数で絞る
        </Heading>
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <NumberInput value={recruitNumbers} setValue={setRecruitNumbers} />
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
