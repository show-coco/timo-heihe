import React, { useEffect, useState } from "react";
import {
  ChatItemFragment,
  ThreadListQuery,
  useThreadListQuery,
} from "../../generated/types";
import { ChatItem } from "./chat-item";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  roomId: number;
};

const currentDate = new Date().toISOString();

export const ThreadList: React.FC<Props> = ({ roomId }: Props) => {
  const [threads, setThreads] = useState<ChatItemFragment[]>([]);
  const { data, loading, error, fetchMore } = useThreadListQuery({
    variables: {
      input: {
        roomId,
        createdAt: currentDate,
      },
    },
  });

  useEffect(() => {
    if (data?.threads) {
      setThreads(data?.threads);
      console.log("first threads", data.threads);
    }
  }, [data?.threads]);

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
    <div id="scrollDiv" className="h-70vh overflow-auto flex flex-col-reverse">
      <InfiniteScroll
        hasMore={true}
        loader={<p>ロード中です</p>}
        scrollableTarget="scrollDiv"
        dataLength={threads.length}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        next={async () => {
          const { data }: { data: ThreadListQuery } = await fetchMore({
            variables: {
              input: {
                roomId,
                createdAt: threads[threads.length - 1].createdAt,
              },
            },
          });
          setThreads([...threads, ...data.threads]);
        }}
      >
        {threads.map((thread, i) => (
          <ChatItem item={thread} key={i} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
