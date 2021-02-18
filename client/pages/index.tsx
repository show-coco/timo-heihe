import React, { useMemo } from "react";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { SearchArea } from "../components/search-area/search-area";
import { useSearchTeams } from "../hooks/useSearchTeams";

export default function Home() {
  const { teamsData, error, loading, ...searchArea } = useSearchTeams();

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

  return (
    <Template className="p-10">
      <Heading as="h1Small">おすすめ</Heading>
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
