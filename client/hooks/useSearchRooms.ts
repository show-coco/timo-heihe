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
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTypeId: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  categoryAndSkillData?: SearchConditionsQuery;
  skillIds: number[];
  roomsData: RoomsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  typeId: number;
};

export const useSearchTeams = (): UseSearch => {
  const { skillIds: mySkillIds } = useAuthContext();
  const { data: categoryAndSkillData } = useSearchConditionsQuery();
  const [title, setTitle] = useState<string>("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>(mySkillIds);
  const [typeId, setTypeId] = useState(TeamType.DEVELOPMENT);
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
        title,
        categoryIds: categoryIds.length ? categoryIds : null,
        skillIds: skillIds.length ? skillIds : null,
        typeId,
      },
    });
  }, [categoryIds, title, refetch, skillIds, typeId]);

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
    setTitle,
    setTypeId,
    skillIds,
    roomsData,
    categoryAndSkillData,
    loading,
    error,
    title,
    typeId,
  };
};
