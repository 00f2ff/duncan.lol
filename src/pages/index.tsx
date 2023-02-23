import { getSlugsForDirectory, serializeMDX } from "util/files";

/**
 * 
 * @returns export async function getStaticPaths() {
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
 */


export async function getStaticProps() {
  const slugs = await getSlugsForDirectory("posts");
  const mdxResults = await Promise.all(
    slugs.map((slug) => serializeMDX(slug, "posts")) // fixme: not pulling out frontmatter
  );
  const posts = mdxResults.map((result) => {
    console.log("helloooo")
    console.log(JSON.stringify(result.frontmatter)); 
    return {
      path: `/posts/${result.frontmatter.Slug}`,
      title: result.frontmatter.Title,
    }
  });

  console.log(JSON.stringify(posts))

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