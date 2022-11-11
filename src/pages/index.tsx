import path from "path";
import { promises as fs } from "fs";
import matter from 'gray-matter';

// todo: move some of this to a util

export async function getStaticProps() {
  const postDirectory = path.join(process.cwd(), "pages/posts");
  const filenames = await fs.readdir(postDirectory);

  const filePromises = filenames.map(async (filename) => {
    const absolutePath = path.join(postDirectory, filename);
    const contentBuffer = await fs.readFile(absolutePath);
    const matterResult = matter(contentBuffer);

    return {
      filename,
      matterResult,
    }
  });

  const files = await Promise.all(filePromises);

  const posts = files.map((file) => {
    return {
      path: `/posts/${file.filename.replace(".mdx", "")}`,
      title: file.matterResult.data.title,
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