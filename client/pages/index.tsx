import React, { useMemo } from "react";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { useTeamsQuery } from "../generated/types";
import { SearchArea } from "../components/search-area/search-area";
import { useSearch } from "../hooks/useSeach";
export default function Home() {
  const { teamsData, loading, error } = useSearch();
  console.log(teamsData);
  const teams = useMemo(() => {
    // FIXME
    return (
      teamsData &&
      teamsData.teams &&
      convertToTeamCardObjFromTeams(teamsData?.teams)
    );
  }, [teamsData]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!teams) return <p>チームがありません</p>;
  {
    /* <TeamCard {...team} key={i} /> */
  }
  return (
    <Template className="p-10">
      <Heading>Board</Heading>
      <div className="grid grid-cols-2 ">
        <div className="space-y-5 mt-5">
          {teamsData?.teams
            ? teamsData.teams.map((team, i) => console.log(team))
            : null}
        </div>
        <SearchArea />
      </div>
    </Template>
  );
}
