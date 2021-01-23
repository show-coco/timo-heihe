import React from "react";
import { useState } from "react";
import { useCreateTeamMutation } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useFileInput } from "./useFileInput";

export const useCreateTeam = () => {
  const { id } = useAuthContext();
  const [createTeam, { loading }] = useCreateTeamMutation();
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [recruitNumber, setRecruitNumber] = useState(0);
  const [repositoryUrl, setRespositoryUrl] = useState("");
  const [isRequired, setIsRequired] = useState("1");
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
  } = useFileInput();

  const getVariables = () => ({
    title,
    owner: {
      id,
    },
    icon: imageUrl,
    skills,
    description,
    members: [
      {
        id,
      },
    ],
    repositoryUrl,
    recruitNumbers: recruitNumber,
    isRequired: isRequired === "2",
  });

  console.log(getVariables());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTeam({
        variables: {
          input: getVariables(),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    setTitle,
    setSkills,
    setDescription,
    onSubmit,
    onClickFileInput,
    onChangeFileInput,
    setRecruitNumber,
    setRespositoryUrl,
    setIsRequired,
    recruitNumber,
    fileRef,
    imageUrl,
    loading,
  };
};
