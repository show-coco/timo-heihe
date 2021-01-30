import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
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
  const [joinTeamDialogIsOpened, setJoinTeamDialogIsOpened] = useState(false);
  const [leaveTeamDialogIsOpened, setLeaveTeamDialogIsOpened] = useState(false);

  const { data } = useTeamQuery({
    variables: {
      id: Number(teamId),
    },
  });

  const [joinTeam] = useJoinTeamMutation();

  const [leaveTeam] = useLeaveTeamMutation();

  const onJoinTeam = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await joinTeam({
        variables: {
          userId,
          teamId: Number(teamId),
        },
      });
    } catch (e) {
      console.error(e);
    }
    setJoinTeamDialogIsOpened(false);
  };

  const onLeaveTeam = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await leaveTeam({
        variables: {
          userId,
          teamId: Number(teamId),
        },
      });
    } catch (e) {
      console.error(e);
    }
    setLeaveTeamDialogIsOpened(false);
  };

  const onClickJoinButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setJoinTeamDialogIsOpened(true);
  };

  const onClickLeaveButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLeaveTeamDialogIsOpened(true);
  };

  const onCloseLeaveDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setLeaveTeamDialogIsOpened(false);
  };

  const onCloseJoinDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setJoinTeamDialogIsOpened(false);
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
    dialogState: {
      joinTeamDialogIsOpened,
      leaveTeamDialogIsOpened,
    },
    dialogSetter: {
      onClickJoinButton,
      onClickLeaveButton,
      onCloseLeaveDialog,
      onCloseJoinDialog,
    },
  };
};