import React, { useState, useEffect } from "react";

import { Heading } from "../../heading/heading";
import { Modal, ModalProps } from "../../modal/modal";
import {
  AutoComplate,
  ACSelectedData,
} from "../../../components/auto-complate/auto-complate";
import { Button } from "../../button";
import { Avatar } from "../../avatar/avatar";

import { useTeamDetail } from "../../../hooks/useRoomDetail";

type Props = ModalProps;

export const LeaveTeanModal: React.FC<Props> = (props: Props) => {
  const [convertTeamMemberObject, setConvertTeamMemberObject] = useState<
    ACSelectedData[]
  >([]);

  const [selectedUser, setSelectedUser] = useState<ACSelectedData[]>([]);
  const [avatarImg, setAvatarImg] = useState<string>("");
  const { room, onLeave } = useTeamDetail();

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

  return (
    <Modal
      {...props}
      style={{
        content: {
          width: "70%",
        },
      }}
    >
      <div className="text-center">
        <Heading as="h1Small" className="mb-5  text-red-500">
          あなたがリーダーです。脱退するにはチームメンバーにホスト権限を譲渡してください
        </Heading>
        <div className="mb-5">
          <div className="w-40 m-auto">
            <AutoComplate
              data={convertTeamMemberObject}
              setSelected={setSelectedUser}
              selectedData={selectedUser}
              placeholder="メンバーを検索する"
            />
          </div>

          <div className="w-9/12 mt-24">
            <p>選択されたユーザー</p>
            {selectedUser.length > 0 && avatarImg && (
              <div className="flex justify-center">
                <Avatar src={avatarImg} />
                <p className="pt-3 pl-2">{convertToUserArray(selectedUser)}</p>
              </div>
            )}
          </div>
          {selectedUser.length > 0 && (
            <p className="mt-10">
              {convertToUserArray(selectedUser)}
              にホスト権限を渡して脱退しますか？
            </p>
          )}
        </div>

        <Button
          variant="outline"
          colorScheme="red"
          className="mt-10"
          onClick={onLeave}
        >
          脱退する
        </Button>
      </div>
    </Modal>
  );
};
