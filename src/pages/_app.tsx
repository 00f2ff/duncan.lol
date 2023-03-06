import { ChakraProvider } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import components from 'components/mdxDefaults'
import { AppProps } from 'next/app'
import theme from 'style/theme'
import { Global } from '@emotion/react';
import fontFamilies from 'style/fonts'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Global styles={fontFamilies} />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  )
}