import { promises as fs } from "fs";
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

// export type ContentDirectory = "posts"; // make it a union type

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

/**
 * May also return directories
 * 
 * @param contentDirectory 
 * @returns 
 */
export async function getFilenamesForDirectory(contentDirectory: string): Promise<string[]> {
  const directory = path.join(process.cwd(), `content/${contentDirectory}`);
  const filenames = await fs.readdir(directory);
  return filenames.map((filename) => filename.replace(/\.mdx/, ""));
}

/**
 * Colons (and maybe other special characters) cause next-mdx-remote to throw YAML formatting exceptions,
 * so they're sanitized when the Notion-export script runs. After the mdx serialization step, we can desanitize
 * the HTML encoding back to the original character since it's stored in a TS Record type
 * @param s 
 * @returns 
 */
function desanitizeHTML(s: string): string {
  return s.replace(/(&#58;)/, ":")
}

export function convert(serializedResult: MDXRemoteSerializeResult, contentDirectory: string, filename: string): NextMDXRemoteSerializeResult {
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


  const nextFrontmatter: FrontmatterSchema = {
    title: desanitizeHTML(frontmatter["Title"]),
    excerpt: frontmatter["Excerpt"] ? desanitizeHTML(frontmatter["Excerpt"]) : "",
    path: `/${contentDirectory}`,
    // path: `/${frontmatter["Slug"]}`, // todo: clean this up because it's messy
    tags: frontmatter["Tags"].toString().split(","),
    status: frontmatter["Status"],
    publishedOn: frontmatter["Published On"].toString(),
    updatedOn: (frontmatter["Updated On"] && frontmatter["Updated On"] !== "undefined") ? frontmatter["Updated On"].toString() : null
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
export async function serializeMDX(filename: string, contentDirectory: string): Promise<NextMDXRemoteSerializeResult> {
  const filenameSansSuffix = filename.replace(".mdx", "");
  const directory = path.join(process.cwd(), `content/${contentDirectory}`);
  const absolutePath = path.join(directory, `${filenameSansSuffix}.mdx`);
  const contentBuffer = await fs.readFile(absolutePath, "utf8");

  const rawSerialized = await serialize(contentBuffer, {
    parseFrontmatter: true
  });

  return convert(rawSerialized, contentDirectory, filename);  
}