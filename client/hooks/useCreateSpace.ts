import React from "react";
import { useState } from "react";
import { SpaceItemFragment, useCreateTeamMutation } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useFileInput, UseFileInputReturn } from "./useFileInput";
import { useModal, UseModalReturn } from "./useModal";

type Props = {
  setSpaces: React.Dispatch<React.SetStateAction<SpaceItemFragment[]>>;
  spaces: SpaceItemFragment[];
};

export type UseCreateSpaceReturn = {
  fileInput: UseFileInputReturn;
  loading: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  modal: UseModalReturn;
};

export const useCreateSpace = ({
  setSpaces,
  spaces,
}: Props): UseCreateSpaceReturn => {
  const { id } = useAuthContext();
  const [createTeam, { loading }] = useCreateTeamMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useFileInput();
  const modal = useModal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createTeam({
        variables: {
          input: {
            title,
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
        const newSpace: SpaceItemFragment = {
          id: data.createTeam.id,
          title: data.createTeam.title,
        };

        setSpaces([...spaces, newSpace]);
      }
    } catch (e) {
      console.log(e);
    }
    modal.onClose();
  };

  return {
    fileInput,
    loading,
    title,
    setTitle,
    setDescription,
    onSubmit,
    modal,
  };
};
