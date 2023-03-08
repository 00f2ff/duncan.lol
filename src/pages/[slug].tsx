import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getSlugsForDirectory, serializeMDX } from "util/files";

interface Props {
  postData: MDXRemoteSerializeResult;
}

export default function Post({ postData }: Props) {
  console.log(postData.frontmatter)

  // todo: pass frontmatter as props into a Post component
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
  // todo: change to result once I fix the package
  try {
    const postData = await serializeMDX(params.slug, "posts");
    return {
      props: {
        postData
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
  
}