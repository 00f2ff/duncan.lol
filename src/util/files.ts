import { promises as fs } from "fs";
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type ContentDirectory = "posts"; // make it a union type

export async function getSlugsForDirectory(contentDirectory: ContentDirectory): Promise<string[]> {
  const directory = path.join(process.cwd(), `content/${contentDirectory}`);
  const filenames = await fs.readdir(directory);
  return filenames.map((filename) => filename.replace(/\.mdx/, ""));
}

/**
 * Serialize an MDX file into frontmatter and MDXRemote-compatible content
 * 
 * @param filename 
 * @returns 
 */
export async function serializeMDX(filename: string, contentDirectory: ContentDirectory): Promise<MDXRemoteSerializeResult> {
  // data sanitization
  const filenameSansSuffix = filename.replace(".mdx", "");
  const directory = path.join(process.cwd(), `content/${contentDirectory}`);
  const absolutePath = path.join(directory, `${filenameSansSuffix}.mdx`);
  const contentBuffer = await fs.readFile(absolutePath, "utf8");

  return serialize(contentBuffer, {
    parseFrontmatter: true
  });
}