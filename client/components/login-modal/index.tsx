import React from "react";
import { Heading } from "../heading/heading";
import { LoginButton } from "../login-button";
import { Modal, ModalProps } from "../modal/modal";

type Props = ModalProps;

export const LoginModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal {...props}>
      <div className="flex flex-col items-center justify-center space-y-7">
        <Heading className="text-orange-400">Cloud Circle</Heading>
        <div className="px-10">
          <p className="text-gray-500">
            Cloud
            Circleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！
          </p>
        </div>
        <LoginButton className="shadow-sm" />
      </div>
    </Modal>
  );
};
