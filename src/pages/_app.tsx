import { MDXProvider } from '@mdx-js/react'
import components from 'components/mdxDefaults'
import { AppProps } from 'next/app'
import { Global } from '@emotion/react';
import fontFamilies from 'style/fonts';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import hljs from "highlight.js";

import "highlight.js/styles/github.css";
import "../style/globals.css";
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  
  return (
    <>
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍥</text></svg>" />
        <title>Duncan</title>
      </Head>
        <Global styles={fontFamilies} />
        <div className="bg-alabaster text-xl leading-6">
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </div>
      <Analytics />
    </>
  )
}