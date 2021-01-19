import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
