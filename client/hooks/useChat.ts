import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChatItemFragment,
  useChatPageQuery,
  useCreateThreadMutation,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export const useChat = () => {
  const { userId, id } = useAuthContext();
  const { data } = useChatPageQuery({
    variables: {
      userId,
    },
  });
  const [createThread] = useCreateThreadMutation();
  const [selectedSpaceId, setSelectedSpaceId] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [threads, setThreads] = useState<ChatItemFragment[]>([]);
  const [text, setText] = useState("");

  const displayedRooms = useMemo(() => {
    if (data && data.user.teams) {
      console.log("team", data.user.teams);
      const team = data.user.teams.filter(
        (team) => team.id === selectedSpaceId
      )[0];

      if (team) {
        return team.rooms;
      }
    }
  }, [data, selectedSpaceId]);

  const selectedRoom = useMemo(() => {
    return displayedRooms?.filter((room) => room.id === selectedRoomId)[0];
  }, [displayedRooms, selectedRoomId]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onClickSendButton = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(id, text, selectedRoomId);

      try {
        const { data } = await createThread({
          variables: {
            input: {
              room: {
                id: selectedRoomId,
              },
              user: {
                id: id,
              },
              text: text,
            },
          },
        });
        if (data) {
          const newThread = data.createThread;
          const thread: ChatItemFragment = {
            id: newThread.id,
            createdAt: newThread.createdAt,
            room: newThread.room,
            text: newThread.text,
            user: newThread.user,
            numberOfMessages: newThread.numberOfMessages,
          };
          setThreads([thread, ...threads]);
          setText("");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [id, text, selectedRoomId, createThread, threads]
  );

  // 最初に表示されるスペースIDをセット
  useEffect(() => {
    if (data?.user.teams) {
      const firstDisplayedTeamId = data?.user.teams[0].id;

      if (firstDisplayedTeamId) {
        setSelectedSpaceId(firstDisplayedTeamId);
      }
    } else {
      console.error("チーム情報が正常に取得できませんでした");
    }
  }, [data?.user.teams]);

  useEffect(() => {
    if (displayedRooms && displayedRooms.length !== 0) {
      setSelectedRoomId(displayedRooms[0].id);
    } else {
      setSelectedRoomId(0);
    }
  }, [displayedRooms, selectedSpaceId]);

  return {
    onClickSendButton,
    setter: {
      setSelectedSpaceId,
      setSelectedRoomId,
      onChangeText,
      setThreads,
    },
    status: {
      selectedSpaceId,
      selectedRoomId,
      text,
      threads,
    },
    displayedRooms,
    selectedRoom,
    data,
  };
};
