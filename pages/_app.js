import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RequireAuth from "../components/RequireAuth";
import SEO from "../components/SEO";
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#ff0000" />
      <SEO />
      <QueryClientProvider client={queryClient}>
        {Component.requireAuth ? (
          <RequireAuth>
            <Component {...pageProps} />
          </RequireAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
