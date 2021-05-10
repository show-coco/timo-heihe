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
import { REGEXES, TEXT_INPUT_ERRORS, useTextInput } from "./useTextInput";
import { useCheckbox } from "./useCheckbox";

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
    max: 50,
  });
  const name = useTextInput({
    required: true,
    max: 30,
  });
  const slug = useTextInput({
    regex: REGEXES.HALF_SIZE_NUMBER,
    required: true,
    min: 3,
    max: 20,
  });
  const description = useTextInput({
    required: true,
    max: 1000,
  });
  const [recruiementLevels, setRecruiementLevels] = useState<number[]>([]);
  const [recruitNumber, setRecruitNumber] = useState(0);
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const invitationUrl = useTextInput({
    regex: REGEXES.URL,
  });
  const [isPrivate, setIsPrivate] = useState<RoomTypeValueType>(
    ROOM_TYPE.PUBLIC
  );
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const categories = useCheckbox({
    min: 1,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
  } = useFileInput();
  const [isPrivateError, setIsPrivateError] = useState("");

  const [types, setTypes] = useState<number[]>([]);

  const getVariables = (): CreateRoomInput => ({
    title: title.value,
    name: name.value,
    slug: slug.value,
    owner: id,
    repositoryUrl,
    invidationUrl: invitationUrl.value,
    icon: imageUrl,
    skills: convertToSkillsIds(selectedSkills),
    description: description.value,
    recruiementLevels,
    withApplication: isPrivate === ROOM_TYPE.PRIVATE,
    categories: categories.values,
    typeIds: types,
  });

  useEffect(() => {
    if (
      slug.errors.length ||
      description.errors.length ||
      title.errors.length ||
      name.errors.length ||
      categories.errors.length ||
      (!isPrivate && invitationUrl.errors.length) ||
      isPrivateError.length
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    categories.errors.length,
    description.errors.length,
    name.errors.length,
    slug.errors.length,
    title.errors.length,
    isPrivateError,
    invitationUrl.errors.length,
    isPrivate,
  ]);

  useEffect(() => {
    if (isPrivate === ROOM_TYPE.PUBLIC && !invitationUrl) {
      setIsPrivateError("招待URLを入力してください");
    } else {
      setIsPrivateError("");
    }
  }, [invitationUrl, isPrivate]);

  const onSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await createRoom({
        variables: {
          input: getVariables(),
        },
      });
      if (typeof window !== "undefined") {
        router.push(`/room/${res.data?.createRoom.slug}`);
      }
    } catch (e) {
      slug.setErrors([...slug.errors, TEXT_INPUT_ERRORS.DEPLICATED]);
      console.error(e);
    }
  };

  const onChangeType = (
    event: React.FormEvent<HTMLInputElement>,
    clickedTypeId: number
  ) => {
    setTypes(toggleArrayItem(types, clickedTypeId));
  };

  return {
    onSubmit,
    onClickFileInput,
    onChangeFileInput,
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
    },
    form: {
      slug,
      title,
      name,
      description,
      categories,
      invitationUrl,
    },
    loading,
    isPrivateError,
    isDisabled,
  };
};
