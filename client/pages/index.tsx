/* ルーム一覧ページ */
import React from "react";
/* Components */
import { SearchArea } from "../components/search-area/search-area";
import { HomeHeader } from "../components/template/home/header";
import { Template } from "../components/template/app/template";
import { Meta } from "../components/meta";
import { Button } from "../components/button";
import { RoomCard } from "../components/card/room-card";
/* Hooks */
import { useSearchTeams } from "../hooks/useSearchRooms";
/* Icons */
import TargetIcon from "../assets/icons/search.svg";
import { Modal } from "../components/modal/modal";
import { useModal } from "../hooks/useModal";
import { Skeleton } from "../components/loading/skeleton";
import { Card } from "../components/card";
import { RoomCardList } from "../components/room-card-list/room-cad-list";

export default function Home() {
  const {
    roomsData,
    error,
    typeId,
    setTypeId,
    loading,
    ...searchArea
  } = useSearchTeams();
  const { isOpen, onClose, onOpen } = useModal();

  if (error) return <p>{error.message}</p>;

  return (
    <Template
      className="pb-10 md:p-10"
      header={
        <HomeHeader
          teamTypes={roomsData?.roomTypes}
          setTypeId={setTypeId}
          typeId={typeId}
        />
      }
    >
      <Meta title={"ルーム一覧ページ | CloudCircle"} />

      <div className="flex md:px-10">
        <div className="w-full mt-5 md:w-3/5">
          {loading && (
            <Card
              className={`p-5 cursor-pointer hover:shadow-md duration-200`}
              tabIndex={0}
              role="button"
            >
              <Skeleton />
            </Card>
          )}

          <RoomCardList rooms={roomsData?.rooms} loading={loading} />
        </div>

        <div className="flex-1 hidden mt-5 ml-10 md:block">
          <SearchArea {...searchArea} onClose={onClose} />
        </div>
      </div>

      <span className="fixed right-3 bottom-3 md:hidden">
        <Button
          isIcon
          colorScheme="black"
          className="rounded-full shadow-md"
          size="large"
          onClick={onOpen}
        >
          <TargetIcon />
        </Button>

        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          style={{
            content: {
              height: "80vh",
              width: "90%",
            },
          }}
        >
          <SearchArea {...searchArea} onClose={onClose} />
        </Modal>
      </span>
    </Template>
  );
}
