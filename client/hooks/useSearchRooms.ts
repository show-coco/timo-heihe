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
  setCategoryIds: React.Dispatch<React.SetStateAction<number[]>>;
  setSkillIds: React.Dispatch<React.SetStateAction<number[]>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setTypeId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLevelIds: React.Dispatch<React.SetStateAction<number[]>>;
  setWithApplication: React.Dispatch<React.SetStateAction<number>>;
  levelIds: number[];
  withApplication: number;
  keyword: string;
  searchConditions?: SearchConditionsQuery;
  skillIds: number[];
  roomsData: RoomsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  typeId: number | undefined;
  categoryIds: number[];
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
  console.log("skillIds", skillIds);
  const { data: roomsData, refetch, loading, error } = useRoomsQuery({
    variables: {
      input: {
        keyword,
        categoryIds: null,
        skillIds: mySkillIds.length ? mySkillIds : null,
        recruitmentLevelIds: null,
        withApplication: false,
        typeId: null,
      },
    },
  });

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

  return {
    handleSubmit,
    setCategoryIds,
    setSkillIds,
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
    keyword,
    typeId,
    categoryIds,
  };
};
