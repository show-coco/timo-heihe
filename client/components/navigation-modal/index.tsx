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
          <div className="flex flex-row pb-2">
            <Avatar
              src={
                "http://flat-icon-design.com/f/f_object_96/s256_f_object_96_0bg.png"
              }
              name="chokin"
              className="mr-3 align-middle cursor-pointer hover:opacity-80"
            />
            <span className="flex items-center">貯金 ブタ子</span>
          </div>
          <div className="flex flex-col divide-y">
            <Link href="/">プロフィール</Link>
            <Link href="/">ルームを探す</Link>
            <Link href="/">メッセージ</Link>
            <Link href="/">受け取った申請</Link>
            <Link href="/">ログアウト</Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center divide-y">
          <div className="flex flex-col">
            <Link href="/">ルームを探す</Link>
          </div>
          <div>
            <div className="w-40">
              <LoginButton className="mt-5 shadow-sm" />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
