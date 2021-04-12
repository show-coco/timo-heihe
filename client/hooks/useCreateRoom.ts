/* ルーム作成ページのロジック */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
/* Types */
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import {
  CreateRoomInput,
  useCreateRoomMutation,
  useSearchConditionsQuery,
} from "../generated/types";
/* Contexts */
import { useAuthContext } from "../providers/useAuthContext";
/* Hooks */
import { useFileInput } from "./useFileInput";
import { REGEXES, useTextInput } from "./useTextInput";

const toggleArrayItem = <T>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

export const convertToCategoriesObj = (categories: number[]) => {
  return categories.map((category) => ({
    id: category,
  }));
};

export const convertToSkillsIds = (skills: ACSelectedData[]): number[] => {
  return skills.map((skill) => Number(skill.id));
};

export const ROOM_TYPE = {
  PUBLIC: "1",
  PRIVATE: "2",
} as const;

export type RoomTypeValueType = typeof ROOM_TYPE[keyof typeof ROOM_TYPE];

export const useCreateRoom = () => {
  const router = useRouter();
  const { id } = useAuthContext();
  const [createRoom, { loading }] = useCreateRoomMutation();
  const { data: searchConditions } = useSearchConditionsQuery();
  const title = useTextInput({
    required: true,
  });
  const name = useTextInput({
    required: true,
  });
  const slug = useTextInput({
    regex: REGEXES.HALF_SIZE_NUMBER,
    required: true,
    min: 3,
    max: 20,
  });
  const description = useTextInput({
    required: true,
  });
  const [recruiementLevels, setRecruiementLevels] = useState<number[]>([]);
  const [recruitNumber, setRecruitNumber] = useState(0);
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [invidationUrl, setInvidationUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState<RoomTypeValueType>(
    ROOM_TYPE.PUBLIC
  );
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
  } = useFileInput();

  const [types, setTypes] = useState<number[]>([]);

  const getVariables = (): CreateRoomInput => ({
    title: title.value,
    name: name.value,
    slug: slug.value,
    owner: id,
    repositoryUrl,
    invidationUrl,
    icon: imageUrl,
    skills: convertToSkillsIds(selectedSkills),
    description: description.value,
    recruiementLevels,
    withApplication: isPrivate === ROOM_TYPE.PRIVATE,
    categories: categories,
    typeIds: types,
  });

  useEffect(() => {
    if (
      slug.errors.length ||
      description.errors.length ||
      title.errors.length ||
      name.errors.length
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    description.errors.length,
    name.errors.length,
    slug.errors.length,
    title.errors.length,
  ]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createRoom({
        variables: {
          input: getVariables(),
        },
      });
      router.push(
        `/room/${res.data?.createRoom.slug}?title=${res.data?.createRoom.title}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeType = (
    event: React.FormEvent<HTMLInputElement>,
    clickedTypeId: number
  ) => {
    setTypes(toggleArrayItem(types, clickedTypeId));
  };

  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    id: number
  ) => {
    setCategories(toggleArrayItem(categories, id));
  };

  return {
    onSubmit,
    onClickFileInput,
    onChangeFileInput,
    onChangeCategories,
    onChangeType,
    searchConditions,
    state: {
      recruiementLevels,
      selectedSkills,
      isPrivate,
      recruitNumber,
      imageUrl,
      fileRef,
    },
    setter: {
      setRecruitNumber,
      setRespositoryUrl,
      setIsPrivate,
      setSkills,
      setRecruiementLevels,
      setInvidationUrl,
    },
    form: {
      slug,
      title,
      name,
      description,
    },
    loading,
    isDisabled,
  };
};
