import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // todo: enhance to use custom styling: https://nextjs.org/docs/advanced-features/using-mdx
    <MDXProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  )
}