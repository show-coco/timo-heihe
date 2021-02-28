import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import {
  MemberState,
  useApplyRoomMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useRoomQuery,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export const useTeamDetail = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const { id: userId } = useAuthContext();
  const [joinRoomDialogIsOpened, setJoinRoomDialogIsOpened] = useState(false);
  const [leaveRoomDialogIsOpened, setLeaveRoomDialogIsOpened] = useState(false);
  const [applyRoomDialogIsOpened, setApplyRoomDialogIsOpened] = useState(false);

  const { data, loading } = useRoomQuery({
    variables: {
      slug: slug?.toString() || "",
    },
  });

  const [joinTeam] = useJoinRoomMutation();

  const [leaveTeam] = useLeaveRoomMutation();

  const [applyTeam] = useApplyRoomMutation();

  const onJoin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await joinTeam({
        variables: {
          userId,
          roomId: Number(slug),
        },
      });
    } catch (e) {
      console.error(e);
    }
    setJoinRoomDialogIsOpened(false);
  };

  const onLeave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await leaveTeam({
        variables: {
          userId,
          roomId: Number(slug),
        },
      });
    } catch (e) {
      console.error(e);
    }
    setLeaveRoomDialogIsOpened(false);
  };

  const onApply = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await applyTeam({
        variables: {
          userId,
          roomId: Number(slug),
        },
      });
    } catch (e) {
      console.error(e);
    }
    setApplyRoomDialogIsOpened(false);
  };

  const onClickJoinButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setJoinRoomDialogIsOpened(true);
  };

  const onClickApplyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setApplyRoomDialogIsOpened(true);
  };

  const onClickLeaveButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLeaveRoomDialogIsOpened(true);
  };

  const onCloseLeaveDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setLeaveRoomDialogIsOpened(false);
  };

  const onCloseApplyDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setApplyRoomDialogIsOpened(false);
  };

  const onCloseJoinDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setJoinRoomDialogIsOpened(false);
  };

  const room = data?.room;

  // HACK
  const isLimitOfRecruit = useMemo(() => {
    if (room && room.members) {
      return room.members.length >= room.recruitNumbers;
    }
  }, [room]);

  const iAmOwner = useMemo(() => {
    return userId === room?.owner.id;
  }, [room?.owner.id, userId]);

  const iAmJoining = useMemo(() => {
    return room?.members?.find(
      (member) =>
        member.id === userId && member.memberState === MemberState.Joining
    );
  }, [room?.members, userId]);

  const iAmApplying = useMemo(() => {
    return room?.members?.find(
      (member) =>
        member.id === userId && member.memberState === MemberState.Pending
    );
  }, [room?.members, userId]);

  const iAmIn = useMemo(() => {
    return room?.members?.find((member) => member.id === userId);
  }, [room?.members, userId]);

  const iCanJoin = useMemo(() => {
    if (room && room.members) {
      return !iAmIn && !room.isRequired && !isLimitOfRecruit;
    }
  }, [iAmIn, isLimitOfRecruit, room]);

  const iCanApply = useMemo(() => {
    if (room && room.members) {
      return !iAmIn && room.isRequired && !isLimitOfRecruit;
    }
  }, [iAmIn, isLimitOfRecruit, room]);

  const iCanEdit = useMemo(() => {
    return iAmOwner;
  }, [iAmOwner]);

  const iCanLeave = useMemo(() => {
    return !iAmOwner && iAmJoining;
  }, [iAmJoining, iAmOwner]);

  return {
    onJoin,
    onLeave,
    onApply,
    iCanJoin,
    iCanApply,
    iCanEdit,
    iCanLeave,
    iAmJoining,
    iAmApplying,
    isLimitOfRecruit,
    room: data?.room,
    slug,
    loading,
    dialogState: {
      joinRoomDialogIsOpened,
      leaveRoomDialogIsOpened,
      applyRoomDialogIsOpened,
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
