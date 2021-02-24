import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChatItemFragment,
  ChannelItemFragment,
  RoomItemFragment,
  useChatPageQuery,
  useCreateThreadMutation,
  useCreateChannelMutation,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useCreateSpace } from "./useCreateRoom.old";
import { useModal } from "./useModal";

export const useChat = () => {
  const { userId, id } = useAuthContext();
  const [createThread] = useCreateThreadMutation();
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [selectedChannelId, setSelectedChannelId] = useState(0);
  const [rooms, setRooms] = useState<RoomItemFragment[]>([]);
  const [threads, setThreads] = useState<ChatItemFragment[]>([]);
  const [channels, setChannels] = useState<ChannelItemFragment[]>([]);
  const [text, setText] = useState("");
  const [channelName, setChannelName] = useState("");

  const createSpace = useCreateSpace({ setRooms: setRooms, rooms: rooms });

  const createRoomModal = useModal();

  const { data } = useChatPageQuery({
    variables: {
      userId,
    },
  });

  console.log("chat", data);

  const [createRoom] = useCreateChannelMutation();

  const selectedRoom = useMemo(() => {
    return data?.user.rooms?.find((room) => room.id === selectedRoomId);
  }, [data?.user.rooms, selectedRoomId]);

  const selectedChannel = useMemo(() => {
    return channels?.find((room) => room.id === selectedChannelId);
  }, [channels, selectedChannelId]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value);
  };

  const onCreateRoom = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const { data } = await createRoom({
        variables: {
          input: {
            name: channelName,
            room: {
              id: selectedRoomId,
            },
          },
        },
      });

      // 作成したチャンネルを表示
      if (data) {
        const createdChannel: ChannelItemFragment = {
          id: data.createChannel.id,
          name: data.createChannel.name,
        };
        setChannels([...channels, createdChannel]);
      }
      createRoomModal.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSendButton = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(id, text, selectedChannelId);

      try {
        const { data } = await createThread({
          variables: {
            input: {
              channel: {
                id: selectedChannelId,
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
            channel: newThread.channel,
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
    [id, text, selectedChannelId, createThread, threads]
  );

  useEffect(() => {
    if (selectedRoom?.channels) {
      setChannels(selectedRoom.channels);
    }
  }, [selectedRoom?.channels]);

  useEffect(() => {
    if (data?.user.rooms) {
      setRooms(data.user.rooms);
    }
  }, [data?.user.rooms]);

  // 最初に表示されるスペースIDをセット
  useEffect(() => {
    if (data?.user.rooms) {
      const firstDisplayedTeamId = data?.user.rooms[0].id;

      if (firstDisplayedTeamId) {
        setSelectedRoomId(firstDisplayedTeamId);
      }
    } else {
      console.error("ルーム情報が正常に取得できませんでした");
    }
  }, [data?.user.rooms]);

  useEffect(() => {
    if (channels && channels.length !== 0) {
      setSelectedChannelId(channels[0].id);
    } else {
      setSelectedChannelId(0);
    }
  }, [channels, selectedRoomId]);

  return {
    onClickSendButton,
    onCreateRoom,
    setter: {
      setSelectedRoomId,
      setSelectedChannelId,
      onChangeText,
      onChangeRoomName,
      setThreads,
    },
    status: {
      selectedRoomId,
      selectedChannelId,
      text,
      channelName,
      threads,
      channels,
      rooms,
    },
    selectedRoom,
    selectedChannel,
    data,
    createRoomModal,
    createSpace,
  };
};
