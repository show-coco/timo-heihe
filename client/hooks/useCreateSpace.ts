import React from "react";
import { useState } from "react";
import { useCreateTeamMutation } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";
import { useFileInput } from "./useFileInput";

export const useCreateSpace = () => {
  const { id } = useAuthContext();
  const [createTeam, { loading }] = useCreateTeamMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useFileInput();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createTeam({
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
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fileInput,
    loading,
    title,
    setTitle,
    setDescription,
    onSubmit,
  };
};
