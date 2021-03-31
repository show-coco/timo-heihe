import Link from "next/link";
import React from "react";
import { Avatar } from "../avatar/avatar";
import { Heading } from "../heading/heading";
import { LoginButton } from "../login-button";
import { Modal, ModalProps } from "../modal/modal";
import { useAuthContext } from "../../providers/useAuthContext";

type Props = ModalProps & {
  isAuth: boolean;
};

export const NavigationModal: React.FC<Props> = (props: Props) => {
  const { avatar, name, userId, logout } = useAuthContext();

  return (
    <Modal {...props}>
      {props.isAuth ? (
        <div className="flex flex-col">
          <div className="flex flex-row justify-center pb-3">
            <Avatar
              src={avatar}
              name={name}
              className="align-middle cursor-pointer hover:opacity-80"
            />
            <span className="flex items-center ml-3">{name}</span>
          </div>
          <div className="flex flex-col space-y-3 divide-y divide-gray-200">
            <span>
              <Link href="/user/[id]" as={`/user/${userId}`}>
                プロフィール
              </Link>
            </span>
            <span className="pt-3">
              <Link href="/">ルームを探す</Link>
            </span>
            <span className="pt-3">
              <Link href="/">メッセージ</Link>
            </span>
            <span className="pt-3">
              <Link href="/received-applications">受け取った申請</Link>
            </span>
            <span className="pt-3">
              <button onClick={logout}>ログアウト</button>
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-200">
          <div className="grid justify-items-center">
            <Link href="/">ルームを探す</Link>
          </div>
          <div className="grid pt-3 justify-items-center">
            <LoginButton className="items-center" />
          </div>
        </div>
      )}
    </Modal>
  );
};
