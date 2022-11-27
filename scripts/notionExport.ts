import { getPublishedPosts, n2m, pagePropertiesToFrontmatter } from "./lib/notion";
import { promises as fs } from "fs";
import { replaceWeirdCharacters, uuidToPageId } from "./util/string";

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

const PAGES_PATH = "../src/content/posts/";

export async function exportNotionPosts() {
  const posts = await getPublishedPosts(); 

  const pageData: { [pageId: string]: string } = posts.reduce((acc, post) => {
    const pageId = uuidToPageId(post.id);
    const frontmatter = pagePropertiesToFrontmatter(post);
    acc[pageId] = frontmatter;
    return acc;
  }, {})

  for await (const id of Object.keys(pageData)) {
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    const frontmatter = pageData[id];
    const fixedString = replaceWeirdCharacters(mdString);
  
    await fs.writeFile(`${PAGES_PATH}${"index"}.mdx`, `${frontmatter}${fixedString}`);
  }
}

base(exportNotionPosts);

export {}