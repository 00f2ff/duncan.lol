import { Center, Heading } from "@chakra-ui/react";
import GoBack from "components/GoBack";
import Layout from "components/Layout";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <Layout key="404">
        <GoBack path="/" text="home" />
        <Heading size="2xl"><Link target="_blank" href="https://www.youtube.com/watch?v=CtWirGxV7Q8">You know I can't grab your ghost chips</Link></Heading>
      </Layout>
    </>
  )
}

export default Custom404;