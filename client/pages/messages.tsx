import React from "react";
import { useMessageTimelinesQuery } from "../generated/types";

export default function MessagesPage() {
  const { data, loading, error } = useMessageTimelinesQuery();

  if (error) console.error(error);

  return <div>メッセージページ</div>;
}
