import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from "components/Layout";
import { getSlugsForDirectory, serializeMDX } from "util/files";
import { Center, Heading, SimpleGrid } from '@chakra-ui/react';
import GoBack from 'components/GoBack';


interface Props {
  post: MDXRemoteSerializeResult;
}

// fixme: abstract layout component more for index and slug

export default function Post({ post }: Props) {
  // todo: do I need a use effect to wait until page is loaded to render the back button? seems weird
  return (
    <Layout>
      <Center>
        <SimpleGrid 
          key={`post-${post.frontmatter.title}`}
          columns={1} 
          spacing={5} 
          width={"45%"}
          marginTop={"50px"}
          marginBottom={"50px"}
        >
          <GoBack path="/" text="home" />
          
          <Heading>{post.frontmatter.title}</Heading>

          {/* This renders the post */}
          <MDXRemote {...post} />
        </SimpleGrid>
      </Center>
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