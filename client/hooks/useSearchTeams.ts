import React, { useState } from "react";
import {
  useSearchConditionsQuery,
  SearchConditionsQuery,
  useTeamsQuery,
} from "../generated/types";

export type UseSearch = {
  handleSubmit: () => void;
  handleChangeCategories: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangeSkills: (e: React.FormEvent<HTMLInputElement>) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  categoryAndSkillData?: SearchConditionsQuery;
  setRecruitNumbers: React.Dispatch<React.SetStateAction<number>>;
  recruitNumbers: number;
};

export const useSearchTeams = () => {
  const { data: categoryAndSkillData } = useSearchConditionsQuery();
  const [recruitNumbers, setRecruitNumbers] = useState(0);
  const [name, setName] = useState<string>("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const { data: teamsData, refetch, loading, error } = useTeamsQuery();

  const handleSubmit = () => {
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
