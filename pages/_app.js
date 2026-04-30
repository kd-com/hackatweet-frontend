import { useEffect } from "react";
import '../styles/globals.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Charge le CSS de Modal côté client
    import("antd/lib/modal/style/index.css");
  }, []);
  return (
    <>
      <Head>
        <title>Hakatweet</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
