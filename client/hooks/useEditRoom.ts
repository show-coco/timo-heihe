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
import { REGEXES, TEXT_INPUT_ERRORS, useTextInput } from "./useTextInput";
import { useCheckbox } from "./useCheckbox";

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
  const categories = useCheckbox({
    min: 1,
  });
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [invitationUrl, setInvitationUrl] = useState("");
  const [withApplication, setWithApplication] = useState("1");
  const [recruitmentLevels, setRecruitmentLevels] = useState<number[]>([]);
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const [types, setTypes] = useState<number[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
    setImageUrl,
  } = useFileInput();
  const [isPrivateError, setIsPrivateError] = useState("");
  const [isDisbaled, setIsDisabled] = useState(true);

  const { data, loading, error } = useRoomEditPageQuery({
    variables: {
      slug: querySlug?.toString() || "",
    },
  });

  if (error) console.log(error);
  if (error) {
    router.push("/404");
  }

  const [updateTeam] = useEditRoomMutation();

  useEffect(() => {
    if (
      slug.errors.length ||
      description.errors.length ||
      title.errors.length ||
      name.errors.length ||
      categories.errors.length ||
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
  ]);

  useEffect(() => {
    if (withApplication === "1" && !invitationUrl) {
      setIsPrivateError("招待URLを入力してください");
    } else {
      setIsPrivateError("");
    }
  }, [invitationUrl, withApplication]);

  useEffect(() => {
    if (!loading && data) {
      const room = data.room;
      const typeIds = room.types.map((type) => type.id);

      title.setValue(room.title);
      name.setValue(room.name);
      slug.setValue(room.slug);
      description.setValue(room.description);
      setInvitationUrl(room.invidationUrl || "");
      setRespositoryUrl(room.repositoryUrl || "");
      setWithApplication(room.withApplication ? "2" : "1");
      setRecruitmentLevels(
        room.recruitmentLevels.map((recruitmentLevel) => recruitmentLevel.id)
      );
      setSkills(convertToACSelectedData(room.skills || []));
      categories.setValues(convertToCategoryArray(room.categories));
      setImageUrl(room.icon || "");
      setTypes(typeIds);
    }
  }, [data, loading, setImageUrl]);

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

  const onSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await updateTeam({
        variables: {
          input: {
            id: data?.room.id || 0,
            name: name.value,
            title: title.value,
            slug: slug.value,
            icon: imageUrl,
            skills: convertToSkillsIds(selectedSkills),
            recruiementLevels: recruitmentLevels,
            description: description.value,
            repositoryUrl,
            invidationUrl: invitationUrl,
            withApplication: withApplication === "2",
            categories: categories.values,
            typeIds: types,
          },
        },
      });
      router.push(
        `/room/${res.data?.updateRoom.slug}?title=${res.data?.updateRoom.title}`
      );
    } catch (e) {
      slug.setErrors([...slug.errors, TEXT_INPUT_ERRORS.DEPLICATED]);
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
      setRespositoryUrl,
      setWithApplication,
      setRecruitmentLevels,
      setInvitationUrl,
      setSkills,
      setImageUrl,
      onChangeType,
    },
    form: {
      title,
      name,
      slug,
      description,
      categories,
    },
    isPrivateError,
    isDisbaled,
    onSubmit,
    categories: data?.categories || [],
    skills: data?.skills || [],
    roomTypes: data?.roomTypes || [],
    recruitmentLevels: data?.recruitmentLevels || [],
    ownerId: data?.room.owner.id,
  };
};
