import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import { TeamEditPageQuery, useTeamEditPageQuery } from "../generated/types";
import { useFileInput } from "./useFileInput";

const convertToACSelectedData = (
  skills: TeamEditPageQuery["team"]["skills"]
): ACSelectedData[] => {
  if (!skills) return [];
  return skills?.map<ACSelectedData>((skill) => ({
    id: skill.id.toString(),
    name: skill.name,
  }));
};

export const convertToCategoryArray = (
  categories: TeamEditPageQuery["team"]["categories"]
): number[] => {
  if (!categories) return [];
  return categories.map((category) => category.id || 0);
};

export const useEditTeam = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, loading } = useTeamEditPageQuery({
    variables: {
      id: Number(id),
    },
  });
  const [title, setTitle] = useState("");
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
    setImageUrl,
  } = useFileInput();

  useEffect(() => {
    if (!loading && data) {
      const team = data.team;

      setTitle(team.title);
      setDescription(team.description);
      setRecruitNumber(team.recruitNumbers);
      setRespositoryUrl(team.repositoryUrl || "");
      setIsRequired(team.isRequired ? "2" : "1");
      setSkills(convertToACSelectedData(team.skills));
      setCategories(convertToCategoryArray(team.categories));
      setImageUrl(team.icon || "");
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

  return {
    formState: {
      title,
      description,
      recruitNumber,
      repositoryUrl,
      isRequired,
      selectedSkills,
      categories,
      imageUrl,
    },
    file: {
      fileRef,
      onClickFileInput,
      onChangeFileInput,
    },
    setter: {
      setTitle,
      setDescription,
      setRecruitNumber,
      setRespositoryUrl,
      setIsRequired,
      setSkills,
      onChangeCategories,
      setImageUrl,
    },
    categories: data?.categories || [],
    skills: data?.skills || [],
  };
};
