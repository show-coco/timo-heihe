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
import { convertToSkillsIds, useCreateRoom } from "./useCreateRoom";
import { TEXT_INPUT_ERRORS } from "./useTextInput";
import { useAuthGuard } from "./useAuthGurad";

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
  const { form, ...createRoom } = useCreateRoom();

  const { data, loading, error } = useRoomEditPageQuery({
    variables: {
      slug: querySlug?.toString() || "",
    },
  });

  useAuthGuard({ ownerId: data?.room.owner.id });

  if (error) console.log(error);
  if (error) {
    router.push("/404");
  }

  const [updateTeam] = useEditRoomMutation();

  useEffect(() => {
    if (!loading && data) {
      const room = data.room;
      const typeIds = room.types.map((type) => type.id);

      form.title.setValue(room.title);
      form.name.setValue(room.name);
      form.slug.setValue(room.slug);
      form.description.setValue(room.description);
      form.invitationUrl.setValue(room.invidationUrl || "");
      form.repositoryUrl.setValue(room.repositoryUrl || "");
      form.isPrivate.setIsPrivate(room.withApplication ? "2" : "1");
      form.recruiementLevels.setRecruiementLevels(
        room.recruitmentLevels.map((recruitmentLevel) => recruitmentLevel.id)
      );
      form.skills.setSkills(convertToACSelectedData(room.skills || []));
      form.file.setImageUrl(room.icon || "");
      form.type.setTypes(typeIds);
    }
  }, [data, loading]);

  const onSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const { data: updatedData, errors } = await updateTeam({
        variables: {
          input: {
            id: data?.room.id || 0,
            name: form.name.value,
            title: form.title.value,
            slug: form.slug.value,
            icon: form.file.imageUrl,
            skills: convertToSkillsIds(form.skills.value),
            recruiementLevels: form.recruiementLevels.value,
            description: form.description.value,
            repositoryUrl: form.repositoryUrl.value,
            invidationUrl: form.invitationUrl.value,
            withApplication: form.isPrivate.value === "2",
            typeIds: form.type.value,
          },
        },
      });
      console.error(errors);
      router.push(`/room/${updatedData?.updateRoom.slug}`);
    } catch (e) {
      form.slug.setErrors([...form.slug.errors, TEXT_INPUT_ERRORS.DEPLICATED]);
      console.log(e);
    }
  };

  return {
    ...createRoom,
    form: {
      ...form,
      onSubmit,
    },
  };
};
