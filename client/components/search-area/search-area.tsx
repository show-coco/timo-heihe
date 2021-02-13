import React, { useState } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";

type SearchAreaPros = {};

export const SearchArea = () => {
  const [RecruitNumber, setRecruitNumber] = useState(0);
  return (
    <div className="mt-5">
      {/* テキストインプットと背景青 */}
      <div className="bg-indigo-900 text-center rounded-t-md">
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
        <Checkbox>GraphQL</Checkbox>
        <Checkbox>GraphQL</Checkbox>
        <Checkbox>GraphQL</Checkbox>
        <Checkbox>GraphQL</Checkbox>
        <Checkbox>GraphQL</Checkbox>
        <Checkbox>GraphQL</Checkbox>
        <Checkbox>GraphQL</Checkbox>
        {/* かてごリーで絞る */}
        <Heading as="h2" className="py-4">
          カテゴリーで絞る
        </Heading>
        <Checkbox>ios</Checkbox>
        <Checkbox>ios</Checkbox>
        <Checkbox>ios</Checkbox>
        {/* 検索ボタン */}
        <div className="text-center p-8">
          <Button type="submit">検索</Button>
        </div>
      </div>
    </div>
  );
};
