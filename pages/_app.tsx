import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import Head from "next/head";
import type { AppProps } from "next/app";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../context/auth";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Youtube Steamer</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}>
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              {getLayout(
                <main>
                  <Component {...pageProps} />
                </main>
              )}
            </AuthContextProvider>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
