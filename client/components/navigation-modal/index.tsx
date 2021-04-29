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
                <a className="inline-block w-full">プロフィール</a>
              </Link>
            </span>
            <span className="pt-3">
              <Link href="/">
                <a className="inline-block w-full">ルームを探す</a>
              </Link>
            </span>
            <span className="pt-3">
              <Link href="/create-room">
                <a className="inline-block w-full">ルームを作成</a>
              </Link>
            </span>
            <span className="pt-3">
              <Link href="/">
                <a className="inline-block w-full">メッセージ</a>
              </Link>
            </span>
            <span className="pt-3">
              <Link href="/received-applications">
                <a className="inline-block w-full">受け取った申請</a>
              </Link>
            </span>
            <span className="pt-3">
              <button onClick={logout} className="w-full text-left">
                ログアウト
              </button>
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-200">
          <div className="grid justify-items-center">
            <Link href="/">
              <a className="inline-block w-full">ルームを探す</a>
            </Link>
          </div>
          <div className="grid pt-3 justify-items-center">
            <LoginButton className="items-center" />
          </div>
        </div>
      )}
    </Modal>
  );
};
