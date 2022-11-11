import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getSlugsForDirectory, serializeMDX } from "util/files";

interface Props {
  postData: MDXRemoteSerializeResult;
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <MDXRemote {...postData} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const slugs = await getSlugsForDirectory("posts");

  const paths = slugs.map((slug) => {
    return {
      params: {
        slug
      }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await serializeMDX(params.slug, "posts");
  return {
    props: {
      postData
    }
  }
}