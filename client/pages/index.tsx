import React, { useMemo } from "react";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { useTeamsQuery } from "../generated/types";

export default function Home() {
  const { data, error, loading } = useTeamsQuery();

  const teams = useMemo(() => {
    return data && data.teams && convertToTeamCardObjFromTeams(data?.teams);
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!teams) return <p>チームがありません</p>;

  return (
    <Template>
      <Heading>Board</Heading>
      <div className="space-y-5 mt-5">
        {teams.map((team, i) => (
          <TeamCard {...team} key={i} />
        ))}
      </div>
    </Template>
  );
}
