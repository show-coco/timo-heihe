import React from "react";
import { useEditTeam } from "../../../hooks/useEditRoom";
import { EditRoomForm } from "../../../components/edit-room-form";

export default function EditRoom() {
  return (
    <EditRoomForm
      {...useEditTeam()}
      buttonName="編集する"
      title="ルームを編集する"
    />
  );
}
