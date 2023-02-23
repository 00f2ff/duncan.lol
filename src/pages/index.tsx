import { Box, Center, Link } from "@chakra-ui/react";
import Layout from "components/Layout";
import { getSlugsForDirectory, serializeMDX } from "util/files";

export async function getStaticProps() {
  const slugs = await getSlugsForDirectory("posts");
  const mdxResults = await Promise.all(
    slugs.map((slug) => serializeMDX(slug, "posts"))
  );
  const posts = mdxResults.map((result) => {
    return {
      path: `/${result.frontmatter.Slug}`,
      title: result.frontmatter.Title,
    }
  });

  return {
    props: {
      posts
    }
  }
}

type Props = {
  posts: {
    path: string;
    title: string;
  }[]
}

export default function Home({ posts }: Props ) {
  console.log(posts)
  return (
    <Layout>
      <Box>
        {posts && posts.map((post) => {
          return (
            <Link key={post.title} href={post.path}>{post.title}</Link>
          )
        })}
      </Box>
    </Layout>
  );
}