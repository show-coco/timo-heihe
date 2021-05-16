/* ルーム作成ページのロジック */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
/* Types */
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import {
  CreateRoomInput,
  useCreateRoomMutation,
  UserDetailPageDocument,
  UserDetailPageQuery,
  UserDetailPageQueryVariables,
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
  const { id, userId } = useAuthContext();
  const [createRoom, { loading }] = useCreateRoomMutation();
  const { data: selectableData } = useSearchConditionsQuery();
  const title = useTextInput({
    required: true,
    max: 50,
    name: "募集タイトル",
    placeholder: "メンバー募集タイトル",
  });
  const name = useTextInput({
    required: true,
    max: 30,
    name: "ルーム名",
    placeholder: "ルーム名を入力",
  });
  const slug = useTextInput({
    regex: REGEXES.HALF_SIZE_NUMBER,
    required: true,
    min: 3,
    max: 40,
    name: "ルームID",
    placeholder: "ルームID",
  });
  const description = useTextInput({
    required: true,
    max: 1000,
    name: "ルームについて",
    placeholder:
      "ルームについて（Markdown記法）&#13;&#10;最初の一文がルーム一覧の説明文に表示されます。",
  });
  const repositoryUrl = useTextInput({
    name: "Githubリポジトリ",
    placeholder: "URLを入力",
  });
  const invitationUrl = useTextInput({
    regex: REGEXES.URL,
    required: true,
    name: "招待URL",
    placeholder: "DiscordやSlackの招待URL",
  });
  const [isPrivate, setIsPrivate] = useState<RoomTypeValueType>(
    ROOM_TYPE.PUBLIC
  );
  const [recruiementLevels, setRecruiementLevels] = useState<number[]>([]);
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
    repositoryUrl: repositoryUrl.value,
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
        update: (client, res) => {
          const data: UserDetailPageQuery | null = client.readQuery<
            UserDetailPageQuery,
            UserDetailPageQueryVariables
          >({
            query: UserDetailPageDocument,
            variables: {
              userId,
            },
          });

          if (data && res.data) {
            client.writeQuery<
              UserDetailPageQuery,
              UserDetailPageQueryVariables
            >({
              query: UserDetailPageDocument,
              variables: {
                userId,
              },
              data: {
                user: data.user,
                rooms: [...data.rooms, res.data.createRoom],
              },
            });
          }
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
    selectableData,
    loading,
    isDisabled,
    form: {
      slug,
      title,
      name,
      description,
      invitationUrl,
      file: {
        onClickFileInput,
        onChangeFileInput,
        imageUrl,
        fileRef,
      },
      type: {
        onChangeType,
      },
      repositoryUrl,
      isPrivate: {
        value: isPrivate,
        setIsPrivate,
        isPrivateError,
      },
      skills: {
        value: selectedSkills,
        setSkills,
      },
      recruiementLevels: {
        value: recruiementLevels,
        setRecruiementLevels,
      },
      onSubmit,
    },
  };
};
