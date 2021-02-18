import { ApolloError } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  useSearchConditionsQuery,
  SearchConditionsQuery,
  useTeamsQuery,
  TeamsQuery,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export type UseSearch = {
  handleSubmit: () => void;
  handleChangeCategories: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangeSkills: (e: React.FormEvent<HTMLInputElement>) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setRecruitNumbers: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  categoryAndSkillData?: SearchConditionsQuery;
  recruitNumbers: number;
  skillIds: number[];
  teamsData: TeamsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export const useSearchTeams = (): UseSearch => {
  const { userId, skillIds: mySkillIds } = useAuthContext();
  const { data: categoryAndSkillData } = useSearchConditionsQuery();
  const [recruitNumbers, setRecruitNumbers] = useState(0);
  const [name, setName] = useState<string>("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>(mySkillIds);
  const [isRecommended, setIsRecommend] = useState(true);
  const { data: teamsData, refetch, loading, error } = useTeamsQuery({
    variables: {
      input: {
        recommend: isRecommended,
        userId,
      },
    },
  });

  console.log("myskillids", mySkillIds);
  console.log("skillIds", skillIds);

  useEffect(() => {
    setSkillIds(mySkillIds);
  }, [mySkillIds]);

  const handleSubmit = () => {
    refetch({
      input: {
        recruitNumbers,
        name,
        categoryIds: categoryIds.length ? categoryIds : null,
        skillIds: skillIds.length ? skillIds : null,
        recommend: isRecommended,
        userId,
      },
    });
  };

  const handleChangeCategories = (e: React.FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).checked === true) {
      const delteDuplicateCategories = new Set([...categoryIds]);
      setCategoryIds([
        ...delteDuplicateCategories,
        Number(e.currentTarget.value),
      ]);
    } else if ((e.target as HTMLInputElement).checked === false) {
      const removeCheck = Number(e.currentTarget.value);
      const newCategories = categoryIds.filter((value) => value != removeCheck);
      setCategoryIds(newCategories);
    }
  };

  const handleChangeSkills = (e: React.FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).checked === true) {
      const delteDuplicateSkills = new Set([...skillIds]);
      setSkillIds([...delteDuplicateSkills, Number(e.currentTarget.value)]);
    } else if ((e.target as HTMLInputElement).checked === false) {
      const removeCheck = Number(e.currentTarget.value);
      const newSkills = skillIds.filter((value) => value != removeCheck);
      setSkillIds(newSkills);
    }
  };

  return {
    handleSubmit,
    handleChangeCategories,
    handleChangeSkills,
    skillIds,
    teamsData,
    categoryAndSkillData,
    loading,
    error,
    setName,
    name,
    setRecruitNumbers,
    recruitNumbers,
  };
};
