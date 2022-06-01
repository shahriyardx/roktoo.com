import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import RequireAuth from "../components/RequireAuth";
import SEO from "../components/SEO";
import wrapper from "../redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDonators } from "../redux/donator";

const queryClient = new QueryClient();

const Roktoo = ({ Component, pageProps: { session, ...pageProps } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/all`)
      .then((response) => response.json())
      .then((data) => dispatch(setDonators(data)));
  }, [dispatch]);

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
};

export default wrapper.withRedux(Roktoo);
