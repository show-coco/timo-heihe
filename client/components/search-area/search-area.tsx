import React, { FC } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import { Checkbox } from "../checkbox/checkbox";
import { UseSearch } from "../../hooks/useSearchRooms";

type Props = Omit<
  UseSearch,
  "error" | "loading" | "roomsData" | "typeId" | "setTypeId"
>;

export const SearchArea: FC<Props> = ({
  setTitle,
  handleSubmit,
  handleChangeCategories,
  handleChangeSkills,
  title,
  skillIds,
  categoryAndSkillData,
}: Props) => {
  return (
    <div className="w-11/12 pl-10 mt-5">
      <div className="flex justify-center bg-blue-550 rounded-t-md">
        <div className="w-9/12">
          <TextInput
            onChange={(e) => setTitle(e.target.value)}
            className="my-6"
            placeholder="キーワードで検索する"
            value={title}
          />
        </div>
      </div>

      <div className="px-8 bg-white">
        <Heading as="h3" className="pt-6">
          技術で絞る
        </Heading>

        <div>
          {categoryAndSkillData?.skills.map((skill, i) => (
            <Checkbox
              key={i}
              className="mt-4 mr-4"
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

        <Heading as="h3" className="pt-6">
          カテゴリーで絞る
        </Heading>
        <div>
          {categoryAndSkillData?.categories.map((category, i) => (
            <Checkbox
              key={i}
              className="mt-4 mr-4"
              value={category.id?.toString()}
              onChange={(e) => handleChangeCategories(e)}
            >
              {category.name}
            </Checkbox>
          ))}
        </div>

        <div className="p-8 text-center">
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
