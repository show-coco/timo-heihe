import { useRouter } from "next/router";
import React, { useMemo } from "react";
import {
  useJoinTeamMutation,
  useLeaveTeamMutation,
  useTeamQuery,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export const useTeamDetail = () => {
  const router = useRouter();
  const teamId = router.query.id;
  const { id: userId } = useAuthContext();

  const { data } = useTeamQuery({
    variables: {
      id: Number(teamId),
    },
  });

  const [joinTeam] = useJoinTeamMutation();

  const [leaveTeam] = useLeaveTeamMutation();

  const onJoinTeam = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    joinTeam({
      variables: {
        userId,
        teamId: Number(teamId),
      },
    });
  };

  const onLeaveTeam = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    leaveTeam({
      variables: {
        userId,
        teamId: Number(teamId),
      },
    });
  };

  const team = data?.team;

  const iAmJoining = useMemo(() => {
    return Boolean(
      team?.members?.filter((member) => member.id === userId).length
    );
  }, [team?.members, userId]);

  const iAmOwner = useMemo(() => {
    return userId === team?.owner.id;
  }, [team?.owner.id, userId]);

  return {
    onJoinTeam,
    onLeaveTeam,
    iAmJoining,
    iAmOwner,
    team: data?.team,
    teamId,
  };
};
