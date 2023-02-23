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

  const rawSerialized = await serialize(contentBuffer, {
    parseFrontmatter: true
  });

  if (!rawSerialized.frontmatter) {
    return rawSerialized;
  }

  // type predicate
  const isDate = (obj: any): obj is Date => (obj as Date).toLocaleDateString() !== undefined;

  // Stringify dates since getStaticProps can't serialize them to JSON correctly.
  // MDX serialization misrepresents objects as strings
  // fixme: figure out why type predicate doesn't work
  // const widenedFrontmatter: Record<string, any> = rawSerialized.frontmatter;

  // const updatedFrontmatter: Record<string, string> = Object.entries(widenedFrontmatter).reduce((acc, [key, value]) => {
    
  //   if ((value as Date).toLocaleDateString() !== undefined) {
  //     acc[key] = value.toLocaleDateString();
  //   } else {
  //     acc[key] = value;
  //   }
  //   console.log(typeof value, value);
  //   // acc[key] = value ? JSON.stringify(value) : "";
  //   console.log(acc)
  //   return acc;
  // }, {});

  rawSerialized.frontmatter["Published On"] = rawSerialized.frontmatter["Published On"].toString();
  rawSerialized.frontmatter["Updated On"] = rawSerialized.frontmatter["Updated On"] ? rawSerialized.frontmatter["Updated On"].toString() : "";
  return rawSerialized;
}