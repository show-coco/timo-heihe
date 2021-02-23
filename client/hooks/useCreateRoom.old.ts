import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { RoomItemFragment, useCreateRoomMutation } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useFileInput, UseFileInputReturn } from "./useFileInput";
import { useModal, UseModalReturn } from "./useModal";

type Props = {
  setRooms: React.Dispatch<React.SetStateAction<RoomItemFragment[]>>;
  rooms: RoomItemFragment[];
};

export type UseCreateRoomReturn = {
  fileInput: UseFileInputReturn;
  loading: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  modal: UseModalReturn;
  moveToRecruitModal: UseModalReturn;
  moveToRecruit: () => void;
};

export const useCreateSpace = ({
  setRooms: setSpaces,
  rooms: spaces,
}: Props): UseCreateRoomReturn => {
  const router = useRouter();
  const { id } = useAuthContext();
  const [createRoom, { loading }] = useCreateRoomMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useFileInput();
  const modal = useModal();
  const [newSpaceId, setNewSpaceId] = useState(0);
  const moveToRecruitModal = useModal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createRoom({
        variables: {
          input: {
            title,
            name: "",
            owner: {
              id,
            },
            icon: fileInput.imageUrl,
            description,
            members: [
              {
                user: {
                  id,
                },
              },
            ],
          },
        },
      });

      console.log("response on useCreateSpace", data);

      if (data) {
        const newSpace: RoomItemFragment = {
          id: data.createRoom.id,
          title: data.createRoom.title,
        };

        setSpaces([...spaces, newSpace]);
        modal.onClose();
        moveToRecruitModal.onOpen();
        setNewSpaceId(newSpace.id || 0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const moveToRecruit = () => {
    router.push({
      pathname: "/space/settings/[spaceId]",
      query: {
        spaceId: newSpaceId,
      },
    });
  };

  return {
    fileInput,
    loading,
    title,
    setTitle,
    setDescription,
    onSubmit,
    moveToRecruit,
    modal,
    moveToRecruitModal,
  };
};
