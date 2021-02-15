import React, { useState, useEffect } from "react";
import {
  useFetchCategoryQuery,
  useFetchSkillQuery,
  useTeamsQuery,
  TeamQuery,
} from "../generated/types";
export const useSearch = () => {
  const { data: categoryData } = useFetchCategoryQuery();
  const { data } = useFetchSkillQuery();
  const [recruitNumbers, setRecruitNumbers] = useState(0);
  const [name, setName] = useState<string>("");
  const [searchedTeams, setSearchedTemas] = useState<TeamQuery>();
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [searchData, setSeacrhData] = useState({});

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

  console.log("検索: ", teamsData);
  // useEffect(() => {
  //   setSearchedTemas(dataS);
  //   console.log("検索結果: ", searchedTeams);
  // }, [searchData, dataS]);

  const handleChangeCategories = (e: React.FormEvent<HTMLInputElement>) => {
    // チェック入れた挙動
    if ((e.target as HTMLInputElement).checked === true) {
      const duplicateDelteCategories = new Set([...categoryIds]);
      setCategoryIds([
        ...duplicateDelteCategories,
        Number(e.currentTarget.value),
      ]);
      // チェックを外した挙動
    } else if ((e.target as HTMLInputElement).checked === false) {
      const removeCheck = Number(e.currentTarget.value);
      const newCategories = categoryIds.filter((value) => value != removeCheck);
      setCategoryIds(newCategories);
    }
  };

  const handleChangeSkills = (e: React.FormEvent<HTMLInputElement>) => {
    // チェックを外した挙動
    if ((e.target as HTMLInputElement).checked === true) {
      const duplicateDelteSkill = new Set([...skillIds]);
      setSkillIds([...duplicateDelteSkill, Number(e.currentTarget.value)]);
      // チェック入れた挙動
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
    setName,
    name,
    data,
    dataR: categoryData,
    teamsData,
    loading,
    error,
    setRecruitNumbers,
    recruitNumbers,
    searchedTeams,
  };
};
