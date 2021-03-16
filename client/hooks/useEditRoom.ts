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
import { convertToSkillsIds } from "./useCreateRoom";

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
  const querySlug = router.query.slug;
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [invitationUrl, setInvitationUrl] = useState("");
  const [withApplication, setWithApplication] = useState("1");
  const [recruitmentLevels, setRecruitmentLevels] = useState<number[]>([]);
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

  const { data, loading, error } = useRoomEditPageQuery({
    variables: {
      slug: querySlug?.toString() || "",
    },
  });

  if (error) console.log(error);

  const [updateTeam] = useEditRoomMutation();

  useEffect(() => {
    if (!loading && data) {
      const room = data.room;
      const typeIds = room.types.map((type) => type.id);

      setTitle(room.title);
      setName(room.name);
      setSlug(room.slug);
      setDescription(room.description);
      setInvitationUrl(room.invidationUrl || "");
      setRespositoryUrl(room.repositoryUrl || "");
      setWithApplication(room.withApplication ? "2" : "1");
      setRecruitmentLevels(
        room.recruitmentLevels.map((recruitmentLevel) => recruitmentLevel.id)
      );
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
      const res = await updateTeam({
        variables: {
          input: {
            id: data?.room.id || 0,
            name,
            title,
            slug,
            icon: imageUrl,
            skills: convertToSkillsIds(selectedSkills),
            recruiementLevels: recruitmentLevels,
            description,
            repositoryUrl,
            invidationUrl: invitationUrl,
            withApplication: withApplication === "2",
            categories: categories,
            typeIds: types,
          },
        },
      });
      router.push(`/room/${res.data?.updateRoom.slug}`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    formState: {
      title,
      name,
      slug,
      description,
      repositoryUrl,
      invitationUrl,
      recruitmentLevels,
      withApplication,
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
      setSlug,
      setDescription,
      setRespositoryUrl,
      setWithApplication,
      setRecruitmentLevels,
      setInvitationUrl,
      setSkills,
      onChangeCategories,
      setImageUrl,
      onChangeType,
    },
    onSubmit,
    categories: data?.categories || [],
    skills: data?.skills || [],
    roomTypes: data?.roomTypes || [],
    recruitmentLevels: data?.recruitmentLevels || [],
    ownerId: data?.room.owner.id,
  };
};
