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
  const firstHeading = text.match(/^#{1}.*\n/);
  let firstPagraph;
  if (firstHeading) {
    firstPagraph = text.match(/\n.+/);
  } else {
    firstPagraph = text.match(/.+/);
  }

  return <div className={className}>{firstPagraph && firstPagraph[0]}</div>;
};
