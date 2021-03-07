import React, { useEffect, useState } from "react";

import { ACSelectedData } from "../components/auto-complate/auto-complate";
import { useTeamDetail } from "../hooks/useRoomDetail";

export const UseTeamLeave = () => {
  const [selectedUser, setSelectedUser] = useState<ACSelectedData[]>([]);
  const [avatarImg, setAvatarImg] = useState<string>("");
  const { room, onLeave } = useTeamDetail();
  const [applyRoomDialogIsOpened, setApplyRoomDialogIsOpened] = useState(false);
  const [convertTeamMemberObject, setConvertTeamMemberObject] = useState<
    ACSelectedData[]
  >([]);
  const onCloseApplyDialog = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    event.preventDefault();
    setApplyRoomDialogIsOpened(false);
  };
  const convertToUserArray = (users: ACSelectedData[]) => {
    return users.map((res) => res.name);
  };
  useEffect(() => {
    if (room?.members) {
      const coverToData = room?.members?.map((res) => {
        return {
          name: res.name,
          id: res.id.toString(),
        };
      });

      setConvertTeamMemberObject(coverToData);
    }

    if (selectedUser.length > 1) {
      alert("ユーザーは一人しか選択できません。最初からやり直してください");
      setSelectedUser([]);
    }

    const getImageUrl = (id: string) => {
      room?.members
        ?.filter((res) => res.id === Number(id))
        .map((findurl) => findurl.avatar && setAvatarImg(findurl.avatar));
    };

    const idsArray = selectedUser.map((res) => res.id);
    getImageUrl(idsArray.join());
  }, [selectedUser]);

  return {
    convertTeamMemberObject,
    convertToUserArray,
    setSelectedUser,
    selectedUser,
    avatarImg,
    onLeave,
  };
};
