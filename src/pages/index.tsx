import { getSlugsForDirectory, serializeMDX } from "util/files";

export async function getStaticProps() {
  const slugs = await getSlugsForDirectory("posts");
  const mdxResults = await Promise.all(
    slugs.map((slug) => serializeMDX(slug, "posts"))
  );
  // todo: fix naming as I add more content
  const posts = mdxResults.map((result) => {
    return {
      path: `/posts/${result.frontmatter.Slug}`,
      title: result.frontmatter.Title,
    }
  });

  return {
    props: {
      posts
    }
  }
}

export default function Home({ posts }) {
  return (
    <>
    {JSON.stringify(posts)}
    </>
  );
}