import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getSlugsForDirectory, serializeMDX } from "util/files";
import { Heading } from '@chakra-ui/react';
import GoBack from 'components/GoBack';


interface Props {
  post: MDXRemoteSerializeResult;
}

export default function Post({ post }: Props) {
  return (
    <Layout verticalSpacing={10}>
      <GoBack path="/" text="home" />
      <Heading>{post.frontmatter.title}</Heading>
      {/* This renders the post */}
      <MDXRemote {...post} />
    </Layout>
  );
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
    const post = await serializeMDX(params.slug, "posts");
    return {
      props: {
        post
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
  
}