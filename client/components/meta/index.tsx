import Head from "next/head";

export type Props = {
  title?: string;
  description?: string;
  keyword?: string;
  image?: string;
  url?: string;
};

export const Meta = ({ title, description, keyword, image, url }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta content="text/html; charset=shift_jis" httpEquiv="Content-Type" />
      <meta
        property="og:description"
        content={
          description
            ? description
            : "CloudCircleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！"
        }
      />
      <meta name="keywords" content={keyword} />
      {/* website,blog,articleの中から抜粋*/}
      <meta property="og:type" content={`article`} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image ? image : "/ogp.png"} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:site" content="@test" />
      <meta name="twitter:url" content={image ? image : "/ogp.png"} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={
          description
            ? description
            : "CloudCircleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！"
        }
      />
      <meta name="twitter:image" content={image ? image : "/ogp.png"} />
      <link rel="canonical" href={url} />
    </Head>
  );
};
