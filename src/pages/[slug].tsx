import { promises as fs } from "fs";
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

export default function Post({ postData }) {
  console.log(postData)
  return (
    <MDXRemote {...postData} />
  )
}

export async function getStaticPaths() {
  const postDirectory = path.join(process.cwd(), "pages/posts");
  const filenames = await fs.readdir(postDirectory);

  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace(/\.mdx/, ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const postDirectory = path.join(process.cwd(), "pages/posts");
  const absolutePath = path.join(postDirectory, `${slug}.mdx`);
  const contentBuffer = await fs.readFile(absolutePath, "utf8");

  const mdxSource: MDXRemoteSerializeResult = await serialize(contentBuffer, {
    parseFrontmatter: true
  });

  return {
    props: {
      mdxSource
    }
  }
}