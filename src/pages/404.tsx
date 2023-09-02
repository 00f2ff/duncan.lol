import GoBack from "components/GoBack";
import Layout from "components/Layout";
import { NextPage } from "next";
import Head from "next/head";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <Layout key="404">
        <GoBack path="/" text="home" />
        <a target="_blank" href="https://www.youtube.com/watch?v=CtWirGxV7Q8"><h1 className="font-heading font-semibold text-5xl mt-6">You know I can't grab your ghost chips</h1></a>
      </Layout>
    </>
  )
}

export default Custom404;