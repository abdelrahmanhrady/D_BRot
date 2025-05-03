import Head from 'next/head';
import Image from 'next/image'; // Use instead of <img>
import { createGlobalStyle } from 'styled-components';
import { Web3Provider } from '../components/StateContext/webContext'; // Import the Web3Provider

// Global styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider> {/* Wrapping your app with Web3Provider */}
      <>
        <Head>
          <title>♦ Brot ♦</title>
          <link rel="icon" type="image/x-icon" href="/favi.ico" />
          <meta name="description" content="Put a description here about your app" />
          <meta name="robots" content="index, follow" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon_package/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon_package/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon_package/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon_package/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <GlobalStyle />
        {/* The Component is rendered inside Web3Provider */}
        <Component {...pageProps} />
      </>
    </Web3Provider>
  );
}
