import React, { useState, useEffect } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { NumberInput } from "../number-input/number-input";

import { useSearch } from "../../hooks/useSeach";

export const SearchArea = () => {
  const {
    handleSubmit,
    handleChangeCategories,
    handleChangeSkills,
    setName,
    name,
    data,
    dataR,
    setRecruitNumbers,
    recruitNumbers,
  } = useSearch();
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
