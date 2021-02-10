import React, { useEffect, useState } from "react";
import {
  ChatItemFragment,
  ThreadListQuery,
  useThreadListQuery,
  useThreadSubscription,
} from "../../generated/types";
import { ChatItem } from "./chat-item";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  roomId: number;
  threads: ChatItemFragment[];
  setThreads: React.Dispatch<React.SetStateAction<ChatItemFragment[]>>;
};

const currentDate = new Date().toISOString();

export const ThreadList: React.FC<Props> = ({
  roomId,
  threads,
  setThreads,
}: Props) => {
  const { data, loading, error, fetchMore } = useThreadListQuery({
    variables: {
      input: {
        roomId,
        cursor: currentDate,
      },
    },
  });

  const { data: newThread } = useThreadSubscription({
    variables: {
      roomId,
    },
  });

  useEffect(() => {
    if (newThread) {
      console.log("new threadssss", newThread);
      setThreads([newThread?.threadAdded, ...threads]);
    }
  }, [newThread, setThreads]);

  useEffect(() => {
    if (data?.threads) {
      setThreads(data?.threads);
      console.log("first threads", data.threads);
    }
  }, [data?.threads, setThreads]);

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
                cursor: threads[threads.length - 1].createdAt,
              },
            },
          });
          if (data.threads) {
            setThreads([...threads, ...data.threads]);
          }
        }}
      >
        {threads.length === 0 ? (
          <p>スレッドを送信してみましょう！</p>
        ) : (
          threads.map((thread, i) => <ChatItem item={thread} key={i} />)
        )}
      </InfiniteScroll>
    </div>
  );
};
