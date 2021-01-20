import React, { useMemo } from "react";
import {
  convertToTeamCardObjFromTeams,
  TeamCard,
} from "../components/card/team-card";
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
      {teams.map((team, i) => (
        <TeamCard {...team} key={i} />
      ))}
    </Template>
  );
}
