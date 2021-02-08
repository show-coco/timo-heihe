import React from "react";
import { useThreadListQuery } from "../../generated/types";
import { ChatItem } from "./chat-item";

type Props = {
  roomId: number;
};

export const ThreadList: React.FC<Props> = ({ roomId }: Props) => {
  const { data, loading, error } = useThreadListQuery({
    variables: {
      roomId,
    },
  });

  if (roomId === 0)
    return (
      <div className="flex-1">
        <p>ルームが選択されていません</p>
      </div>
    );
  if (loading)
    return (
      <div className="flex-1">
        <p>読み込み中</p>
      </div>
    );
  if (error || !data)
    return (
      <div className="flex-1">
        <p>メッセージの読み込みに失敗しました</p>
      </div>
    );

  return (
    <div className="flex-1 overflow-hidden">
      {data.threads.map((thread) => (
        <ChatItem item={thread} key={thread.id} />
      ))}
    </div>
  );
};
