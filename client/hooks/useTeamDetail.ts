import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import {
  MemberState,
  useApplyTeamMutation,
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
  const [applyTeamDialogIsOpened, setApplyTeamDialogIsOpened] = useState(false);

  const { data, loading } = useTeamQuery({
    variables: {
      id: Number(teamId),
    },
  });

  const [joinTeam] = useJoinTeamMutation();

  const [leaveTeam] = useLeaveTeamMutation();

  const [applyTeam] = useApplyTeamMutation();

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

  const onApplyTeam = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await applyTeam({
        variables: {
          userId,
          teamId: Number(teamId),
        },
      });
    } catch (e) {
      console.error(e);
    }
    setApplyTeamDialogIsOpened(false);
  };

  const onClickJoinButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setJoinTeamDialogIsOpened(true);
  };

  const onClickApplyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setApplyTeamDialogIsOpened(true);
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

  const onCloseApplyDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setApplyTeamDialogIsOpened(false);
  };

  const onCloseJoinDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setJoinTeamDialogIsOpened(false);
  };

  const team = data?.team;

  const iAmOwner = useMemo(() => {
    return userId === team?.owner.id;
  }, [team?.owner.id, userId]);

  const iAmJoining = useMemo(() => {
    return team?.members?.find(
      (member) =>
        member.id === userId && member.memberState === MemberState.Joining
    );
  }, [team?.members, userId]);

  const iAmApplying = useMemo(() => {
    return team?.members?.find(
      (member) =>
        member.id === userId && member.memberState === MemberState.Pending
    );
  }, [team?.members, userId]);

  const iAmIn = useMemo(() => {
    return team?.members?.find((member) => member.id === userId);
  }, [team?.members, userId]);

  const iCanJoin = useMemo(() => {
    return !iAmIn && !team?.isRequired;
  }, [iAmIn, team?.isRequired]);

  const iCanApply = useMemo(() => {
    return !iAmIn && !iAmJoining && team?.isRequired;
  }, [iAmIn, iAmJoining, team?.isRequired]);

  const iCanEdit = useMemo(() => {
    return iAmOwner;
  }, [iAmOwner]);

  const iCanLeave = useMemo(() => {
    return !iAmOwner && iAmJoining;
  }, [iAmJoining, iAmOwner]);

  return {
    onJoinTeam,
    onLeaveTeam,
    onApplyTeam,
    iCanJoin,
    iCanApply,
    iCanEdit,
    iCanLeave,
    iAmJoining,
    iAmApplying,
    team: data?.team,
    teamId,
    loading,
    dialogState: {
      joinTeamDialogIsOpened,
      leaveTeamDialogIsOpened,
      applyTeamDialogIsOpened,
    },
    dialogSetter: {
      onClickJoinButton,
      onClickLeaveButton,
      onCloseLeaveDialog,
      onCloseJoinDialog,
      onClickApplyButton,
      onCloseApplyDialog,
    },
  };
};
