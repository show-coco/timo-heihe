import React from "react";
import { ChannelList } from "../components/chat/room-list";
import { SpaceList } from "../components/chat/space-list";
import { ThreadList } from "../components/chat/thread-list";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { TextInput } from "../components/text-input/text-input";
import { useChat } from "../hooks/useChat";
import { ReactComponent as SendIcon } from "../assets/icons/send.svg";
// MEMO&TODO: svgのなぜか色が変えられなかったため、別のsvgファイルを使用してる
import { ReactComponent as InActiveSendIcon } from "../assets/icons/send-inactive.svg";
import { CreateChannelModal } from "../components/chat/modals/create-channel";
import { CreateRoomModal } from "../components/chat/modals/create-room";
import { MoveToRecruitModal } from "../components/chat/modals/move-to-recruit";
import { useAuthGuard } from "../hooks/useAuthGurad";

export default function ChatPage() {
  const {
    status,
    setter,
    selectedRoom,
    selectedChannel,
    onClickSendButton,
    onCreateRoom,
    createRoomModal,
    createSpace,
  } = useChat();

  useAuthGuard({});

  return (
    <>
      <CreateChannelModal
        {...createRoomModal}
        channelName={status.channelName}
        onCreate={onCreateRoom}
        onChangeName={setter.onChangeRoomName}
      />
      <CreateRoomModal {...createSpace} />
      <MoveToRecruitModal
        {...createSpace.moveToRecruitModal}
        onMoveToRecruit={createSpace.moveToRecruit}
      />

      <Template>
        <div className="grid h-full bg-white border border-gray-200 grid-cols-chat">
          <SpaceList
            rooms={status.rooms}
            setSelectedRoom={setter.setSelectedRoomId}
            onOpen={createSpace.modal.onOpen}
          />

          {/* チャンネル一覧 */}
          <div className="flex flex-col border-r border-gray-200">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
              <Heading as="h1Small">
                {selectedRoom ? selectedRoom.name : ""}
              </Heading>
            </div>

            <div className="flex justify-between px-3 py-1">
              <span>チャンネル</span>
              <button
                className="flex items-center justify-center w-6 h-6 rounded-sm hover:bg-black-400 hover:bg-opacity-20"
                onClick={createRoomModal.onOpen}
              >
                +
              </button>
            </div>

            {status.selectedChannelId !== 0 ? (
              <ChannelList
                channels={status.channels}
                setSelectedChannelId={setter.setSelectedChannelId}
              />
            ) : null}
          </div>

          {/* チャット */}
          <div className="flex flex-col">
            <div className="flex items-center h-16 border-b border-gray-200">
              <Heading as="h3" className="ml-5">
                {selectedChannel ? `#${selectedChannel.name}` : ""}
              </Heading>
            </div>

            <ThreadList
              channelId={status.selectedChannelId}
              threads={status.threads}
              setThreads={setter.setThreads}
            />

            {/* 送信フォーム */}
            <form className="items-center h-16" onSubmit={onClickSendButton}>
              <div className="px-10">
                <div className="relative">
                  <TextInput
                    className="w-full p-3"
                    onChange={setter.onChangeText}
                    value={status.text}
                  />
                  <button
                    className="absolute top-0.6 right-2"
                    type="submit"
                    disabled={status.text.length === 0}
                  >
                    {status.text ? <SendIcon /> : <InActiveSendIcon />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Template>
    </>
  );
}
