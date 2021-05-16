/* ルーム作成ページ */
import React from "react";
import { SkillModel } from "../generated/types";
import {
  ACSelectedData,
  AutoComplate,
} from "../components/auto-complate/auto-complate";
/* Hooks */
import { useAuthGuard } from "../hooks/useAuthGurad";
import { useCreateRoom } from "../hooks/useCreateRoom";
import { EditRoomForm } from "../components/edit-room-form/edit-room-form";

export default function CreateRoom() {
  useAuthGuard({});

  return (
    <EditRoomForm
      {...useCreateRoom()}
      buttonName="作成する"
      title="新しいルームを作成する"
    />
  );
}

export const convertToACData = (skills: Pick<SkillModel, "id" | "name">[]) => {
  return skills.map((skill) => ({
    id: skill.id.toString(),
    name: skill.name,
  }));
};

export const convertToSkillPochiSetArray = (skills: ACSelectedData[]) => {
  return skills.map((skill) => skill.name);
};
