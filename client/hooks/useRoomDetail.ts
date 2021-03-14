import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useApplyRoomMutation, useRoomQuery } from "../generated/types";
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

  const [applyTeam] = useApplyRoomMutation();

  const onApply = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await applyTeam({
        variables: {
          userId,
          roomId: data?.room.id || 0, //TODO
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

  const iAmOwner = useMemo(() => {
    return userId === room?.owner.id;
  }, [room?.owner.id, userId]);

  const iCanEdit = useMemo(() => {
    return iAmOwner;
  }, [iAmOwner]);

  return {
    onApply,
    iCanEdit,
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
