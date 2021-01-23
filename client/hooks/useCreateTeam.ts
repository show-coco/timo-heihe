import React from "react";
import { useState } from "react";
import { useCreateTeamMutation } from "../generated/types";
import { useFileInput } from "./useFileInput";

export const useCreateTeam = () => {
  const [createTeam, { loading }] = useCreateTeamMutation();
  const [title, setTitle] = useState("");
  const [ownerId, setOwnerId] = useState("100453910579362727908");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [peopleNumber, setPeopleNumber] = useState(0);
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
      id: ownerId,
    },
    icon: imageUrl,
    skills,
    description,
    members: [
      {
        id: ownerId,
      },
    ],
    repositoryUrl,
    recruitNumbers: peopleNumber,
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
    setOwnerId,
    setSkills,
    setDescription,
    onSubmit,
    onClickFileInput,
    onChangeFileInput,
    setPeopleNumber,
    setRespositoryUrl,
    setIsRequired,
    peopleNumber,
    fileRef,
    imageUrl,
    loading,
  };
};
