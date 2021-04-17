import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import {
  UpdateUserInput,
  useEditUserPageQuery,
  useUpdateUserMutation,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { convertToSkillsIds } from "./useCreateRoom";
import { convertToACSelectedData } from "./useEditRoom";
import { useFileInput } from "./useFileInput";
import { REGEXES, useTextInput } from "./useTextInput";

export const useEditUser = () => {
  const router = useRouter();
  const me = useAuthContext();
  const userName = useTextInput({
    required: true,
  });
  const userId = useTextInput({
    required: true,
    min: 3,
    max: 30,
    regex: REGEXES.HALF_SIZE_NUMBER,
  });
  const introduction = useTextInput({
    required: true,
  });
  const githubId = useTextInput({});
  const twitterId = useTextInput({});
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
    setImageUrl,
  } = useFileInput();
  const [updateUser] = useUpdateUserMutation();
  const [disabled, setDisabled] = useState(false);

  const { data } = useEditUserPageQuery({
    variables: {
      userId: me.userId,
    },
  });

  useEffect(() => {
    if (data) {
      const user = data.user;
      userName.setValue(user.name);
      userId.setValue(user.userId);
      introduction.setValue(user.introduction || "");
      githubId.setValue(user.githubId || "");
      twitterId.setValue(user.twitterId || "");
      setImageUrl(user.avatar || "");
      setSkills(convertToACSelectedData(user.skills || []));
    }
  }, [data, setImageUrl]);

  useEffect(() => {
    if (
      userName.errors.length ||
      userId.errors.length ||
      introduction.errors.length
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    introduction.errors.length,
    userId.errors.length,
    userName.errors.length,
  ]);

  const getVariables = (): UpdateUserInput => ({
    id: me.id,
    userId: userId.value,
    name: userName.value,
    introduction: introduction.value,
    githubId: githubId.value,
    twitterId: twitterId.value,
    avatar: imageUrl,
    skills: convertToSkillsIds(selectedSkills),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          input: getVariables(),
        },
      });
      router.push(`/user/${data?.updateUser.userId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    form: {
      userName,
      userId,
      introduction,
      githubId,
      twitterId,
      imageUrl,
      selectedSkills,
    },
    setter: {
      setSkills,
    },
    file: {
      fileRef,
      onClickFileInput,
      onChangeFileInput,
    },
    skills: data?.skills || [],
    disabled,
    onSubmit,
  };
};
