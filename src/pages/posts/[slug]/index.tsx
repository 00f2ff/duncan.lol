import { MDXRemote } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getFilenamesForDirectory, NextMDXRemoteSerializeResult, serializeMDX } from "util/files";
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
        <h1 className="font-heading font-bold text-5xl mt-6">{frontmatter.title}</h1>
        <PostMetadata {...frontmatter} />
      </Stack>
      {/* This renders the post minus the frontmatter */}
      <MDXRemote {...rest} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const contentDirectory = "posts";
  const filenames = await getFilenamesForDirectory(contentDirectory);
  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename
      }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postResult = await settle(serializeMDX(params.slug, `posts`));
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