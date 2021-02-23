import React from "react";
import { ChannelListFragment, RoomItemFragment } from "../../generated/types";

type Props = {
  channels: ChannelListFragment["channels"];
  setSelectedChannelId: React.Dispatch<React.SetStateAction<number>>;
};

export const ChannelList: React.FC<Props> = ({
  channels,
  setSelectedChannelId,
}: Props) => {
  const channelDoesntExists = channels?.length === 0;

  if (channelDoesntExists) {
    return <p className="text-center mt-2">チャンネルが存在しません</p>;
  }

  return (
    <div className="flex-1">
      {channels?.map((channel) => (
        <div
          key={channel.id}
          className="pl-4 py-1 hover:bg-opacity-20 hover:bg-black-400 cursor-pointer"
          onClick={() => setSelectedChannelId(channel.id)}
        >
          # {channel.name}
        </div>
      ))}
    </div>
  );
};
