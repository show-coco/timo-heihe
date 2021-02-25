import React from "react";

type Props = {
  text: string;
  className?: string;
};

// 最初の<p>タグを読み取ってレンダリング
export const FirstParagraphDisplayer: React.FC<Props> = ({
  text,
  className,
}: Props) => {
  console.log(text);
  const firstPagraph = text.match(/\n(.+?)\n/);
  console.log("firstParagraph", firstPagraph);

  return <div className={className}>{firstPagraph && firstPagraph[0]}</div>;
};
