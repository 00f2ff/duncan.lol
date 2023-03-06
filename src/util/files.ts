import { promises as fs } from "fs";
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type ContentDirectory = "posts"; // make it a union type

export type FrontmatterSchema = {
  title: string;
  excerpt: string;
  path: string;
  tags: string[];
  status: string;
  publishedOn: string;
  updatedOn: string | null;
}

export type NextMDXRemoteSerializeResult = Omit<MDXRemoteSerializeResult, "frontmatter"> & {
  frontmatter?: FrontmatterSchema;
}

export async function getSlugsForDirectory(contentDirectory: ContentDirectory): Promise<string[]> {
  const directory = path.join(process.cwd(), `content/${contentDirectory}`);
  const filenames = await fs.readdir(directory);
  return filenames.map((filename) => filename.replace(/\.mdx/, ""));
}

function convert(serializedResult: MDXRemoteSerializeResult): NextMDXRemoteSerializeResult {
  const {
    frontmatter,
    ...rest
  } = serializedResult;

  if (!Object.keys(frontmatter)) {
    return {
      ...rest
    }
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

  console.log(frontmatter["Tags"]);

  const nextFrontmatter: FrontmatterSchema = {
    title: frontmatter["Title"],
    excerpt: frontmatter["Excerpt"],
    path: `/${frontmatter["Slug"]}`,
    tags: frontmatter["Tags"].toString().split(","), // fixme: make sure this is accurate
    status: frontmatter["Status"],
    publishedOn: frontmatter["Published On"].toString(),
    updatedOn: frontmatter["Updated On"] ? frontmatter["Updated On"].toString() : null
  }

  return {
    ...rest,
    frontmatter: nextFrontmatter,
  }
}

/**
 * Serialize an MDX file into frontmatter and MDXRemote-compatible content
 * 
 * @param filename 
 * @returns 
 */
export async function serializeMDX(filename: string, contentDirectory: ContentDirectory): Promise<NextMDXRemoteSerializeResult> {
  const filenameSansSuffix = filename.replace(".mdx", "");
  const directory = path.join(process.cwd(), `content/${contentDirectory}`);
  const absolutePath = path.join(directory, `${filenameSansSuffix}.mdx`);
  const contentBuffer = await fs.readFile(absolutePath, "utf8");

  const rawSerialized = await serialize(contentBuffer, {
    parseFrontmatter: true
  });

  return convert(rawSerialized);  
}