import React, { useMemo } from "react";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
import { Template } from "../components/template/template";
import { SearchArea } from "../components/search-area/search-area";
import { useSearchTeams } from "../hooks/useSearchTeams";
import { Button } from "../components/button";

export default function Home() {
  const {
    teamsData,
    error,
    loading,
    typeId,
    setTypeId,
    ...searchArea
  } = useSearchTeams();

  const teams = useMemo(() => {
    return (
      teamsData &&
      teamsData.teams &&
      convertToTeamCardObjFromTeams(teamsData?.teams)
    );
  }, [teamsData]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!teams) return <p>ルームがありません</p>;

  return (
    <Template className="p-10">
      <div className="space-x-3">
        {teamsData?.teamTypes.map((type) => (
          <Button
            key={type.id}
            variant={typeId === type.id ? "primary" : "ghost"}
            onClick={() => setTypeId(type.id)}
          >
            {type.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 ">
        <div className="space-y-5 mt-5">
          {teams.map((team, i) => (
            <TeamCard {...team} key={i} />
          ))}
        </div>
        <SearchArea {...searchArea} />
      </div>
    </Template>
  );
}
