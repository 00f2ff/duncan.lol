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
      <Layout>
        <GoBack path="/" text="home" />
        <Heading size="2xl"><Link href="/">You know I can't eat your ghost chips</Link></Heading>
      </Layout>
    </>
  )
}

export default Custom404;