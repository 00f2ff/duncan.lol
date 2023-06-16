import { ChakraProvider } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import components from 'components/mdxDefaults'
import { AppProps } from 'next/app'
import theme from 'style/theme'
import { Global } from '@emotion/react';
import fontFamilies from 'style/fonts';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

import "../style/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍥</text></svg>" />
        <title>Duncan</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Global styles={fontFamilies} />
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </ChakraProvider>
      <Analytics />
    </>
  )
}