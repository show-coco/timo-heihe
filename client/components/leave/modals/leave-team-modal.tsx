import React from "react";

import { Heading } from "../../heading/heading";
import { Modal, ModalProps } from "../../modal/modal";
import { AutoComplate } from "../../../components/auto-complate/auto-complate";
import { Button } from "../../button";
import { Avatar } from "../../avatar/avatar";
import { UseTeamLeave } from "../../../hooks/useTeamLeave";
type Props = ModalProps;

export const LeaveTeanModal: React.FC<Props> = (props: Props) => {
  const {
    convertTeamMemberObject,
    convertToUserArray,
    setSelectedUser,
    selectedUser,
    avatarImg,
    onLeave,
  } = UseTeamLeave();

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
