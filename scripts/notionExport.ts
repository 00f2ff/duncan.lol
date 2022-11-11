import { getPublishedPosts, n2m } from "./lib/notion";
import { promises as fs } from "fs";
import { uuidToPageId } from "./lib/util";

// todo: replace with top-level await
export async function base(script: () => Promise<void>) {
  /**
   * Node process exits with exitCode==0 when there are still
   * promises awaiting. We prevent this from happening by adding
   * event-loop timer and clearing it after code finishes.
   */
   const i = setInterval(() => {
    /* do nothing but prevent node process from exiting */
  }, 1000);

  try {
    await script();
  } catch (e) {
    console.log(e);
  } finally {
    clearInterval(i);
  }

  // revert back to correct status code, because we didn't encounter any errors
  process.exitCode = 0;
  process.exit();
}

const PAGES_PATH = "../src/pages/";

// todo: I'll need a pipeline of transformers on the raw markdown string text

/**
 * Replace invisible / uncommon Unicode characters.
 * 
 * Replacement occurs on a case-by-case basis since I don't want to do a deep dive into Unicode
 * 
 * @param copy 
 */
function replaceWeirdCharacters(copy: string): string {
  const fixedSpaces = copy.replace(/[\u00A0]/gu, " ")
  return fixedSpaces.replace(/[\u2019]/gu, "");
}

export async function exportNotionPosts() {
  const posts = await getPublishedPosts(); // todo: pull more metadata out of this and write to md files too (frontmatter)

  const pageIds = posts.map((post) => uuidToPageId(post.id));
  for await (const id of pageIds) {
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    const fixedString = replaceWeirdCharacters(mdString);
  
    await fs.writeFile(`${PAGES_PATH}${"index"}.mdx`, fixedString);
  }
}

base(exportNotionPosts);

export {}