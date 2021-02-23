import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import {
  UpdateUserInput,
  useEditUserPageQuery,
  useUpdateUserMutation,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { convertToSkillsObj } from "./useCreateRoom";
import { convertToACSelectedData } from "./useEditTeam";
import { useFileInput } from "./useFileInput";

export const useEditUser = () => {
  const router = useRouter();
  const me = useAuthContext();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [githubId, setGithubId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
    setImageUrl,
  } = useFileInput();
  const [updateUser] = useUpdateUserMutation();

  const { data } = useEditUserPageQuery({
    variables: {
      userId: me.userId,
    },
  });

  useEffect(() => {
    if (data) {
      const user = data.user;
      setUserName(user.name);
      setUserId(user.userId);
      setIntroduction(user.introduction || "");
      setGithubId(user.githubId || "");
      setTwitterId(user.twitterId || "");
      setImageUrl(user.avatar || "");
      setSkills(convertToACSelectedData(user.skills || []));
    }
  }, [data, setImageUrl]);

  const getVariables = (): UpdateUserInput => ({
    id: me.id,
    userId: userId,
    name: userName,
    introduction,
    githubId,
    twitterId,
    avatar: imageUrl,
    skills: convertToSkillsObj(selectedSkills),
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
    formState: {
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
      setUserName,
      setUserId,
      setIntroduction,
      setGithubId,
      setTwitterId,
    },
    file: {
      fileRef,
      onClickFileInput,
      onChangeFileInput,
    },
    skills: data?.skills || [],
    onSubmit,
  };
};
