import React from "react";
import { Avatar } from "../../components/avatar/avatar";
import { Card } from "../../components/card/card";
import {
  CategorySet,
  convertToCategoryArray,
} from "../../components/category/category-set";
import { Heading } from "../../components/heading/heading";
import PeopleIcon from "../../assets/icons/people.svg";
import {
  convertToSkillPochiSetArray,
  SkillPochiSet,
} from "../../components/skill/skill-pochi-set";
import { Button } from "../../components/button";
import Link from "next/link";
import { AvatarWithName } from "../../components/avatar/avatar-with-name";
import { useTeamDetail } from "../../hooks/useRoomDetail";
import { SimpleDialog } from "../../components/dialog/simple-dialog";
import { AvatarLink } from "../../components/avatar/avatar-link";
import ReactMarkdown from "react-markdown";
import { useAuthContext } from "../../providers/useAuthContext";
import { useModal } from "../../hooks/useModal";
import { LoginModal } from "../../components/login-modal";
import { Template } from "../../components/template/app/template";

export default function ShowRoom() {
  const {
    onApply,
    iCanEdit,
    slug,
    //   room,
    dialogState,
    dialogSetter,
    loading,
  } = useTeamDetail();
  const { isAuthenticated } = useAuthContext();
  const { isOpen, onOpen, onClose } = useModal();

  // if (loading) return <p>Loading...</p>;
  // if (!room) return <p>データがありません</p>;

  return (
    <>
      <LoginModal isOpen={isOpen} onRequestClose={onClose} />

      <Template className="p-10">
        <div className="flex flex-row space-x-10">
          <Card className="flex-1 p-8">
            <div className="flex justify-between">
              <div className="flex-1">
                <CategorySet
                  categories={convertToCategoryArray([
                    { id: 1, name: "Android" },
                  ])}
                  className="mb-4"
                />

                <div className="flex items-center space-x-3">
                  <div>
                    <Avatar
                      src={
                        "http://flat-icon-design.com/f/f_object_88/s512_f_object_88_0bg.png"
                      }
                      size="large"
                    />
                  </div>
                  <Heading as="h1Big">{"Splatoon"}</Heading>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex items-center space-x-8">
              <span className="flex items-center space-x-3">
                <p className="font-bold">オーナー</p>
                <AvatarWithName
                  src={
                    "http://flat-icon-design.com/f/f_object_88/s512_f_object_88_0bg.jpg"
                  }
                  userId={"123456"}
                  name={"Splatoon"}
                  size="small"
                />
              </span>

              <span className="flex items-center space-x-3">
                <p className="font-bold">ルーム名</p>
                <span>{"Splatoon"}</span>
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <div className="markdown">
                <ReactMarkdown>aaaaaa</ReactMarkdown>
              </div>
            </div>
          </Card>

          <div className="flex flex-col w-1/3 space-y-10">
            <Card className="p-8 text-center">
              <p>
                オーナーから承認されたらメッセージでやりとりすることができます
              </p>
              <Button className="px-12 mt-5 shadow-lg ">申請する</Button>
            </Card>

            <Card className="p-8">
              <div className="mb-7">
                <Heading as="h3">募集するレベル帯</Heading>
                <div className="flex flex-wrap mt-3">
                  {/* <Tag>中級者</Tag>
                  <Tag>上級者</Tag> */}
                </div>
              </div>
              <div>
                <Heading as="h3" className="mb-3">
                  募集する役割
                </Heading>
                <div className="space-y-1">
                  <p>モバイルエンジニア</p>
                  <p>インフラエンジニア</p>
                  <p>デザイナー</p>
                  <p>フロントエンドエンジニア</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <Heading as="h3">使用するスキル</Heading>
              <SkillPochiSet
                skills={convertToSkillPochiSetArray([
                  { id: 1, name: "typescript" },
                  { id: 2, name: "nestjs" },
                  { id: 3, name: "go" },
                ])}
              />
            </Card>
          </div>
        </div>
      </Template>
    </>
  );
}
