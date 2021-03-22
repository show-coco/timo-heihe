import React, { FC } from "react";
import { TextInput } from "../text-input/text-input";
import { Heading } from "../heading/heading";
import { Button } from "../button";
import {
  UseSearch,
  WITH_APPLICATION,
  WITH_NO_APPLICATION,
} from "../../hooks/useSearchRooms";
import { OperationTag } from "../tag/operation";
import { Radio } from "../radio/radio";
import { CheckBoxOperaitons } from "../checkbox/operations";

type Props = Omit<
  UseSearch,
  "error" | "loading" | "roomsData" | "typeId" | "setTypeId"
>;

export const SearchArea: FC<Props> = ({
  setKeyword,
  handleSubmit,
  setCategoryIds,
  setSkillIds,
  setLevelIds,
  setWithApplication,
  withApplication,
  levelIds,
  categoryIds,
  keyword,
  skillIds,
  searchConditions,
}: Props) => {
  return (
    <div className="sticky top-10">
      <div className="flex justify-center bg-blue-550 rounded-t-md">
        <div className="w-9/12">
          <TextInput
            onChange={(e) => setKeyword(e.target.value)}
            className="my-6"
            placeholder="キーワードで検索する"
            value={keyword}
          />
        </div>
      </div>

      <div className="px-8 bg-white">
        <Heading as="h3" className="pt-6">
          技術で絞る
        </Heading>

        <div>
          <CheckBoxOperaitons
            setSelectedItems={setSkillIds}
            selectedItemIds={skillIds}
            items={searchConditions?.skills || []}
            className="mt-4 mr-4"
            isSkill={true}
          />
        </div>

        <Heading as="h3" className="pt-6">
          カテゴリーで絞る
        </Heading>
        <CheckBoxOperaitons
          setSelectedItems={setCategoryIds}
          selectedItemIds={categoryIds}
          items={searchConditions?.categories || []}
          className="mt-4 mr-4"
        />

        <Heading as="h3" className="pt-6 pb-4">
          募集レベルで絞る
        </Heading>
        <div>
          {searchConditions?.recruitmentLevels.map((level) => (
            <OperationTag
              id={level.id}
              name={level.name}
              selectedItemIds={levelIds}
              isSelected={levelIds.includes(level.id)}
              key={level.id}
              setIsSelected={setLevelIds}
            />
          ))}
        </div>

        <Heading as="h3" className="pt-6 pb-4">
          申請の有無
        </Heading>
        <div className="flex space-x-8">
          <Radio
            checked={withApplication === WITH_NO_APPLICATION}
            text="なし"
            name="apply"
            value={WITH_NO_APPLICATION.toString()}
            onChange={(e) => setWithApplication(Number(e.target.value))}
          />
          <Radio
            checked={withApplication === WITH_APPLICATION}
            text="あり"
            name="apply"
            value={WITH_APPLICATION.toString()}
            onChange={(e) => setWithApplication(Number(e.target.value))}
          />
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
