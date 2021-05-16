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
import { REGEXES, TEXT_INPUT_ERRORS, useTextInput } from "./useTextInput";

export const useEditUser = () => {
  const router = useRouter();
  const me = useAuthContext();
  const userName = useTextInput({
    required: true,
    max: 30,
  });
  const userId = useTextInput({
    required: true,
    min: 3,
    max: 30,
    regex: REGEXES.HALF_SIZE_NUMBER,
  });
  const introduction = useTextInput({
    required: true,
    max: 1000,
  });
  const githubId = useTextInput({
    max: 30,
  });
  const twitterId = useTextInput({
    max: 30,
  });
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const {
    fileRef,
    onClickFileInput: onClickFileInput,
    onChangeFileInput: onChangeFileInput,
    imageUrl,
    setImageUrl,
  } = useFileInput();
  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const [disabled, setDisabled] = useState(false);

  const { data, error, loading: userInfoLoading } = useEditUserPageQuery({
    variables: {
      userId: me.userId,
    },
  });

  if (error) {
    router.push("/404");
  }

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
      userId.setErrors([...userId.errors, TEXT_INPUT_ERRORS.DEPLICATED]);
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
    updateUserLoading,
    userInfoLoading,
  };
};
