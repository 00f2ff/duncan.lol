import { MDXRemote } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getFilenamesForDirectory, NextMDXRemoteSerializeResult, serializeMDX } from "util/files";
import { Heading, Stack } from '@chakra-ui/react';
import GoBack from 'components/GoBack';
import PostMetadata from 'components/Metadata';
import { settle } from '@00f2ff/result';


/**
 * debug thoughts
 * 
 * - what if it's that the content/posts directory construct is not propagating to pages?
 *   - there is a difference when loading from / vs refreshing the page
 */

interface Props {
  post: NextMDXRemoteSerializeResult;
}

export default function Post({ post }: Props) { 
  console.log(post)
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

/**
 * 
 * @returns export async function getStaticProps() {
  const filenames = await getFilenamesForDirectory("posts");
  // In the case of content/posts, filenames are directories
  const commonMdxFilename = "index";
  const mdxResults = await Promise.all(
    filenames.map((filename) => serializeMDX(commonMdxFilename, `posts/${filename}`))
  );
  const posts = mdxResults.map((result) => {
    return result.frontmatter
  }).sort(sortByDateDescending);

  console.log(posts[0]);

  return {
    props: {
      posts
    }
  }
}
 */

export async function getStaticPaths() {
  const filenames = await getFilenamesForDirectory("posts");
  // In the case of content/posts, filenames are directories
  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: ["posts", filename]
      }
    }
  });

  console.log("slug page ####### PATHS", JSON.stringify({
    paths,
    fallback: false,
  }))

  return {
    paths,
    fallback: true,
    // fallback: false, // todo: uncomment once I figure out steady state for rebuilds upon new posts
  }
}

export async function getStaticProps({ params }) {
  console.log("##### PROPS params")
  console.log(params)
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