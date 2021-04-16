/* ルーム一覧ページ */
import React, { useMemo } from "react";
/* Components */
import { SearchArea } from "../components/search-area/search-area";
import { HomeHeader } from "../components/template/home/header";
import { Template } from "../components/template/app/template";
import { Meta } from "../components/meta";
import { Button } from "../components/button";
import {
  convertToTeamCardObjFromTeams,
  RoomCard,
} from "../components/card/room-card";
/* Hooks */
import { useSearchTeams } from "../hooks/useSearchRooms";
/* Icons */
import TargetIcon from "../assets/icons/search.svg";
import { Modal } from "../components/modal/modal";
import { useModal } from "../hooks/useModal";

export default function Home() {
  const {
    roomsData,
    error,
    typeId,
    setTypeId,
    ...searchArea
  } = useSearchTeams();
  const { isOpen, onClose, onOpen } = useModal();

  const teams = useMemo(() => {
    return roomsData?.rooms && convertToTeamCardObjFromTeams(roomsData.rooms);
  }, [roomsData]);

  if (error) return <p>{error.message}</p>;

  return (
    <Template
      className="md:p-10"
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
        <div className="w-full mt-5 space-y-5 md:w-3/5">
          {!teams || teams.length === 0 ? (
            <p className="text-lg font-bold text-center">ルームがありません</p>
          ) : (
            teams.map((team, i) => <RoomCard {...team} key={i} />)
          )}
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
