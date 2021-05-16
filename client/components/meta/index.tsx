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
      {/* SEO */}
      <title>{title ? title : "CloudCircle"}</title>
      <meta charSet="utf-8" />
      <meta property="og:title" content={title ? title : "CloudCircle"} />
      <meta property="og:site_name" content="CloudCircle" />
      <meta property="og:type" content="website" />
      <meta name="twitter:url" content={image ? image : "/ogp.png"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <link rel="canonical" href={url} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      {/* <meta name="twitter:site" content="@3shake_Inc" /> */}
      <meta
        name="Description"
        property="og:description"
        content={
          description
            ? description
            : "CloudCircleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！"
        }
      />

      <meta
        property="og:image"
        content={image ? image : "https://cloud-circle.vercel.app/ogp.png"}
      />
      {keyword && <meta name="keywords" content={keyword} />}
      <meta
        name="twitter:image"
        content={image ? image : "https://cloud-circle.vercel.app/ogp.png"}
      />
    </Head>
  );
};
