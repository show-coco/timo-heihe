/**
 * ルーム一覧ページ
 */
import React, { useMemo } from "react";
/* components */
import { SearchArea } from "../components/search-area/search-area";
import { HomeHeader } from "../components/template/app/header/home";
import { Template } from "../components/template/app/template";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
/* hooks */
import { useSearchTeams } from "../hooks/useSearchRooms";

export default function Home() {
  const {
    roomsData,
    error,
    loading,
    typeId,
    setTypeId,
    ...searchArea
  } = useSearchTeams();

  const teams = useMemo(() => {
    return (
      roomsData &&
      roomsData.rooms &&
      convertToTeamCardObjFromTeams(roomsData?.rooms)
    );
  }, [roomsData]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Template
      className="p-10"
      header={
        <HomeHeader
          teamTypes={roomsData?.roomTypes}
          setTypeId={setTypeId}
          typeId={typeId}
        />
      }
    >
      <div className="flex px-10">
        <div className="w-3/5 mt-5 space-y-5">
          {!teams || teams.length === 0 ? (
            <p>ルームがありません</p>
          ) : (
            teams.map((team, i) => <TeamCard {...team} key={i} />)
          )}
        </div>
        <div className="flex-1 mt-5 ml-10">
          <SearchArea {...searchArea} />
        </div>
      </div>
    </Template>
  );
}
