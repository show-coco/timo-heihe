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

const DEFAULT_RECRUIT_NUMBERS = 5;

export const useSearchTeams = (): UseSearch => {
  const { skillIds: mySkillIds } = useAuthContext();
  const { data: categoryAndSkillData } = useSearchConditionsQuery();
  const [recruitNumbers, setRecruitNumbers] = useState(DEFAULT_RECRUIT_NUMBERS);
  const [name, setName] = useState<string>("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>(mySkillIds);
  const { data: teamsData, refetch, loading, error } = useTeamsQuery({
    variables: {
      input: {
        skillIds: mySkillIds,
        recruitNumbers: DEFAULT_RECRUIT_NUMBERS,
      },
    },
  });

  useEffect(() => {
    setSkillIds(mySkillIds);
  }, [mySkillIds]);

  const handleSubmit = () => {
    console.log("aaa");
    refetch({
      input: {
        recruitNumbers,
        name,
        categoryIds: categoryIds.length ? categoryIds : null,
        skillIds: skillIds.length ? skillIds : null,
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
