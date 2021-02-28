import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import {
  SkillModel,
  RoomEditPageQuery,
  useEditRoomMutation,
  useRoomEditPageQuery,
} from "../generated/types";
import { useFileInput } from "./useFileInput";
import { convertToCategoriesObj, convertToSkillsObj } from "./useCreateRoom";

export const convertToACSelectedData = (
  skills: Pick<SkillModel, "id" | "name">[]
): ACSelectedData[] => {
  if (!skills) return [];
  return skills?.map<ACSelectedData>((skill) => ({
    id: skill.id.toString(),
    name: skill.name,
  }));
};

export const convertToCategoryArray = (
  categories: RoomEditPageQuery["room"]["categories"]
): number[] => {
  if (!categories) return [];
  return categories.map((category) => category.id || 0);
};

export const useEditTeam = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recruitNumber, setRecruitNumber] = useState(0);
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [isRequired, setIsRequired] = useState("1");
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const [types, setTypes] = useState<number[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
    setImageUrl,
  } = useFileInput();

  const { data, loading } = useRoomEditPageQuery({
    variables: {
      slug: slug?.toString() || "",
    },
  });

  const [updateTeam] = useEditRoomMutation();

  useEffect(() => {
    if (!loading && data) {
      const room = data.room;
      const typeIds = room.types.map((type) => type.id);

      setTitle(room.title);
      setName(room.name);
      setDescription(room.description);
      setRecruitNumber(room.recruitNumbers);
      setRespositoryUrl(room.repositoryUrl || "");
      setIsRequired(room.isRequired ? "2" : "1");
      setSkills(convertToACSelectedData(room.skills || []));
      setCategories(convertToCategoryArray(room.categories));
      setImageUrl(room.icon || "");
      setTypes(typeIds);
    }
  }, [data, loading, setImageUrl]);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTeam({
        variables: {
          input: {
            id: data?.room.id || 0,
            name,
            title,
            icon: imageUrl,
            skills: convertToSkillsObj(selectedSkills),
            description,
            repositoryUrl,
            recruitNumbers: recruitNumber,
            isRequired: isRequired === "2",
            categories: convertToCategoriesObj(categories),
            typeIds: types,
          },
        },
      });
      router.push(`/room/${slug}`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    formState: {
      title,
      name,
      description,
      recruitNumber,
      repositoryUrl,
      isRequired,
      selectedSkills,
      categories,
      imageUrl,
      types,
    },
    file: {
      fileRef,
      onClickFileInput,
      onChangeFileInput,
    },
    setter: {
      setTitle,
      setName,
      setDescription,
      setRecruitNumber,
      setRespositoryUrl,
      setIsRequired,
      setSkills,
      onChangeCategories,
      setImageUrl,
      onChangeType,
    },
    onSubmit,
    categories: data?.categories || [],
    skills: data?.skills || [],
    roomTypes: data?.roomTypes || [],
    data,
  };
};
