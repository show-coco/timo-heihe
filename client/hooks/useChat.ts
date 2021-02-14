import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChatItemFragment,
  RoomFragment,
  SpaceItemFragment,
  useChatPageQuery,
  useCreateRoomMutation,
  useCreateThreadMutation,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useCreateSpace } from "./useCreateSpace";
import { useModal } from "./useModal";

export const useChat = () => {
  const { userId, id } = useAuthContext();
  const [createThread] = useCreateThreadMutation();
  const [selectedSpaceId, setSelectedSpaceId] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [spaces, setSpaces] = useState<SpaceItemFragment[]>([]);
  const [threads, setThreads] = useState<ChatItemFragment[]>([]);
  const [rooms, setRooms] = useState<RoomFragment[]>([]);
  const [text, setText] = useState("");
  const [roomName, setRoomName] = useState("");

  const createSpace = useCreateSpace({ setSpaces, spaces });

  const createRoomModal = useModal();

  const { data } = useChatPageQuery({
    variables: {
      userId,
    },
  });

  const [createRoom] = useCreateRoomMutation();

  const selectedSpace = useMemo(() => {
    return data?.user.teams?.find((team) => team.id === selectedSpaceId);
  }, [data?.user.teams, selectedSpaceId]);

  const selectedRoom = useMemo(() => {
    return rooms?.find((room) => room.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const onCreateRoom = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const { data } = await createRoom({
        variables: {
          input: {
            name: roomName,
            team: {
              id: selectedSpaceId,
            },
          },
        },
      });

      // 作成したルームを表示
      if (data) {
        const createdRoom: RoomFragment = {
          id: data.createRoom.id,
          name: data.createRoom.name,
        };
        setRooms([...rooms, createdRoom]);
      }
      createRoomModal.onClose();
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    if (selectedSpace?.rooms) {
      setRooms(selectedSpace.rooms);
    }
  }, [selectedSpace?.rooms]);

  useEffect(() => {
    if (data?.user.teams) {
      setSpaces(data.user.teams);
    }
  }, [data?.user.teams]);

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
    if (rooms && rooms.length !== 0) {
      setSelectedRoomId(rooms[0].id);
    } else {
      setSelectedRoomId(0);
    }
  }, [rooms, selectedSpaceId]);

  return {
    onClickSendButton,
    onCreateRoom,
    setter: {
      setSelectedSpaceId,
      setSelectedRoomId,
      onChangeText,
      onChangeRoomName,
      setThreads,
    },
    status: {
      selectedSpaceId,
      selectedRoomId,
      text,
      roomName,
      threads,
      rooms,
      spaces,
    },
    selectedSpace,
    selectedRoom,
    data,
    createRoomModal,
    createSpace,
  };
};
