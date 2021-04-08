import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { AuthProvider } from "../providers/useAuthContext";
import { setContext } from "@apollo/client/link/context";
import { jwtManager } from "../utils/jwtManager";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: `ws://localhost:8080/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = jwtManager.getJwt();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink =
  process.browser && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : httpLink;

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            messages: {
              keyArgs: ["input", ["opponentSlug"]],
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });

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
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
