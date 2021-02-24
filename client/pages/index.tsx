import React, { useMemo } from "react";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
import { Template } from "../components/template/template";
import { SearchArea } from "../components/search-area/search-area";
import { useSearchTeams } from "../hooks/useSearchRooms";
import { HomeHeader } from "../components/template/header/home";

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
  if (!teams) return <p>ルームがありません</p>;

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
      <div className="grid grid-cols-2 px-20">
        <div className="space-y-5 mt-5 w-11/12">
          {teams.map((team, i) => (
            <TeamCard {...team} key={i} />
          ))}
        </div>
        <SearchArea {...searchArea} />
      </div>
    </Template>
  );
}
