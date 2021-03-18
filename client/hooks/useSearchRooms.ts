import { ApolloError } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { TeamType } from "../constants";
import {
  useSearchConditionsQuery,
  SearchConditionsQuery,
  useRoomsQuery,
  RoomsQuery,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export type UseSearch = {
  handleSubmit: () => void;
  handleChangeCategories: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangeSkills: (e: React.FormEvent<HTMLInputElement>) => void;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setTypeId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLevelIds: React.Dispatch<React.SetStateAction<number[]>>;
  setWithApplication: React.Dispatch<React.SetStateAction<number>>;
  levelIds: number[];
  withApplication: number;
  title: string;
  searchConditions?: SearchConditionsQuery;
  skillIds: number[];
  roomsData: RoomsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  typeId: number | undefined;
};

export const WITH_NO_APPLICATION = 0;
export const WITH_APPLICATION = 1;

export const useSearchTeams = (): UseSearch => {
  const { skillIds: mySkillIds } = useAuthContext();
  const { data: searchConditions } = useSearchConditionsQuery();
  const [keyword, setKeyword] = useState<string>("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>(mySkillIds);
  const [levelIds, setLevelIds] = useState<number[]>([]);
  const [typeId, setTypeId] = useState<number | undefined>(undefined);
  const [withApplication, setWithApplication] = useState(WITH_NO_APPLICATION);
  const { data: roomsData, refetch, loading, error } = useRoomsQuery({
    variables: {
      input: {
        skillIds: mySkillIds,
        typeId: TeamType.DEVELOPMENT,
      },
    },
  });

  useEffect(() => {
    setSkillIds(mySkillIds);
  }, [mySkillIds]);

  useEffect(() => {
    refetchRooms();
  }, [typeId]);

  const refetchRooms = useCallback(() => {
    refetch({
      input: {
        keyword,
        categoryIds: categoryIds.length ? categoryIds : null,
        skillIds: skillIds.length ? skillIds : null,
        recruitmentLevelIds: levelIds.length ? levelIds : null,
        withApplication: withApplication === WITH_APPLICATION,
        typeId: typeId || null,
      },
    });
  }, [
    categoryIds,
    keyword,
    levelIds,
    refetch,
    skillIds,
    typeId,
    withApplication,
  ]);

  const handleSubmit = () => {
    refetchRooms();
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
    setKeyword,
    setTypeId,
    setLevelIds,
    setWithApplication,
    levelIds,
    withApplication,
    skillIds,
    roomsData,
    searchConditions,
    loading,
    error,
    title: keyword,
    typeId,
  };
};
