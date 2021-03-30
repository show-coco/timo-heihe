import Link from "next/link";
import React from "react";
import { Avatar } from "../avatar/avatar";
import { Heading } from "../heading/heading";
import { LoginButton } from "../login-button";
import { Modal, ModalProps } from "../modal/modal";

type Props = ModalProps & {
  isAuth: boolean;
};

export const NavigationModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal {...props}>
      {props.isAuth ? (
        <div className="flex flex-col">
          <div className="flex flex-row justify-center pb-3">
            <Avatar
              src={
                "http://flat-icon-design.com/f/f_object_96/s256_f_object_96_0bg.png"
              }
              name="chokin"
              className="mr-3 align-middle cursor-pointer hover:opacity-80"
            />
            <span className="flex items-center">貯金 ブタ子</span>
          </div>
          <div className="flex flex-col space-y-3 divide-y divide-gray-200">
            <span>
              <Link href="/">プロフィール</Link>
            </span>
            <span className="pt-3">
              <Link href="/">ルームを探す</Link>
            </span>
            <span className="pt-3">
              <Link href="/">メッセージ</Link>
            </span>
            <span className="pt-3">
              <Link href="/">受け取った申請</Link>
            </span>
            <span className="pt-3">
              <Link href="/">ログアウト</Link>
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
