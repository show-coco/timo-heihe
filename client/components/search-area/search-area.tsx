import React, { useState } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";
import {
  useFetchCategoryQuery,
  useFetchSkillQuery,
} from "../../generated/types";
type SearchAreaPros = {};
export const SearchArea = () => {
  const { data: dataR } = useFetchCategoryQuery();

  const { data } = useFetchSkillQuery();
  const [RecruitNumber, setRecruitNumber] = useState(0);
  console.log(data);
  return (
    <div className="mt-5 pl-10">
      {/* テキストインプットと背景青 */}
      <div className="bg-blue-550 text-center rounded-t-md">
        <TextInput className="w-9/12 my-6" placeholder="チーム名で検索する" />
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
          {data?.skills.map((skill) => (
            <Checkbox className="pr-6" key={skill.id}>
              {skill.name}
            </Checkbox>
          ))}
        </div>

        {/* カテゴリーで絞るで絞る */}
        <Heading as="h2" className="py-4">
          カテゴリーで絞る
        </Heading>
        <div>
          {dataR?.categories.map((category) => (
            <Checkbox className="pr-6" key={category.id}>
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
