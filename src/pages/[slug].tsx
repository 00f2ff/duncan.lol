import { MDXRemote } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getSlugsForDirectory, NextMDXRemoteSerializeResult, serializeMDX } from "util/files";
import { Heading, Stack } from '@chakra-ui/react';
import GoBack from 'components/GoBack';
import Metadata from 'components/Metadata';


interface Props {
  post: NextMDXRemoteSerializeResult;
}

export default function Post({ post }: Props) { 
  const {
    frontmatter,
    ...rest
  } = post;
  return (
    <Layout verticalSpacing={5}>
      <GoBack path="/" text="home" />
      <Stack direction="column" spacing={2}>
        <Heading>{frontmatter.title}</Heading>
        <Metadata {...frontmatter} />
      </Stack>
      {/* This renders the post minus the frontmatter */}
      <MDXRemote {...rest} />
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
    const post: NextMDXRemoteSerializeResult = await serializeMDX(params.slug, "posts");
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