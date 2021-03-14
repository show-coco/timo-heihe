import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import { CreateRoomInput, useCreateRoomMutation } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useFileInput } from "./useFileInput";

export const convertToCategoriesObj = (categories: number[]) => {
  return categories.map((category) => ({
    id: category,
  }));
};

export const convertToSkillsIds = (skills: ACSelectedData[]): number[] => {
  return skills.map((skill) => Number(skill.id));
};

export const useCreateRoom = () => {
  const router = useRouter();
  const { id } = useAuthContext();
  const [createRoom, { loading }] = useCreateRoomMutation();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [recruitNumber, setRecruitNumber] = useState(0);
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [isRequired, setIsRequired] = useState("1");
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
  } = useFileInput();
  const [types, setTypes] = useState<number[]>([]);

  const getVariables = (): CreateRoomInput => ({
    title,
    name,
    slug,
    owner: id,
    icon: imageUrl,
    skills: convertToSkillsIds(selectedSkills),
    description,
    repositoryUrl,
    invidationUrl: "", // TODO
    recruiementLevels: [], // TODO
    withApplication: isRequired === "2",
    categories: categories,
    typeIds: types,
  });

  console.log(getVariables());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createRoom({
        variables: {
          input: getVariables(),
        },
      });
      router.push(`/room/${res.data?.createRoom.slug}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeType = (
    event: React.FormEvent<HTMLInputElement>,
    clickedTypeId: number
  ) => {
    const valueExists = types.includes(clickedTypeId);
    if (valueExists) {
      const newTypes = types.filter((type) => type !== clickedTypeId);
      setTypes(newTypes);
    } else {
      setTypes([...types, clickedTypeId]);
    }
  };

  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    id: number
  ) => {
    let newCategories = categories.slice();

    if (categories.includes(id)) {
      newCategories = categories.filter((value) => value !== id);
    } else {
      newCategories.push(id);
    }
    setCategories(newCategories);
  };

  return {
    setTitle,
    setSkills,
    setDescription,
    setSlug,
    onSubmit,
    onClickFileInput,
    onChangeFileInput,
    setRecruitNumber,
    setRespositoryUrl,
    setIsRequired,
    onChangeCategories,
    onChangeType,
    setName,
    selectedSkills,
    recruitNumber,
    fileRef,
    imageUrl,
    loading,
  };
};
