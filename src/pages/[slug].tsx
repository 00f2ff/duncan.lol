import { MDXRemote } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getSlugsForDirectory, NextMDXRemoteSerializeResult, serializeMDX } from "util/files";
import { Heading, Stack } from '@chakra-ui/react';
import GoBack from 'components/GoBack';
import PostMetadata from 'components/Metadata';
import { settle } from '@00f2ff/result';


interface Props {
  post: NextMDXRemoteSerializeResult;
}

export default function Post({ post }: Props) { 
  const {
    frontmatter,
    ...rest
  } = post;
  return (
    <Layout verticalSpacing={5} key={frontmatter.path}>
      <GoBack path="/" text="home" />
      <Stack direction="column" spacing={2}>
        <Heading size="2xl">{frontmatter.title}</Heading>
        <PostMetadata {...frontmatter} />
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
  const postResult = await settle(serializeMDX(params.slug, "posts"));
  if (postResult.isFulfilled()) {
    return {
      props: {
        post: postResult.value
      }
    }
  } else {
    return {
      notFound: true
    }
  }
  
}