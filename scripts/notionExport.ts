import { frontmatterBlobToString, getPublishedPosts, n2m, pagePropertiesToFrontmatterBlob } from "./lib/notion";
import { promises as fs } from "fs";
import { replaceWeirdCharacters, uuidToPageId } from "./util/string";
import { MdBlock } from "notion-to-md/build/types";
import { transformMarkdown, PageDatum } from "./lib/mdTransforms";

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

// fixme: add some error handling
export async function exportNotionPosts() {
  const posts = await getPublishedPosts(); 

  const pageData: PageDatum[] = posts.map((post) => {
    const pageId = uuidToPageId(post.id);
    const frontmatterBlob = pagePropertiesToFrontmatterBlob(post);
    const slug = frontmatterBlob.Slug;
    const tags = frontmatterBlob.Tags;
    const frontmatter = frontmatterBlobToString(frontmatterBlob);
    return {
      pageId,
      frontmatter,
      tags,
      slug,
    }
  })

  for await (const {pageId, frontmatter, tags, slug} of pageData) {
    console.info(`Converting page slug ${slug}`);
    const mdblocks: MdBlock[] = await n2m.pageToMarkdown(pageId);
    const { blocks: transformedMdblocks, assets } = await transformMarkdown({blocks: mdblocks, tags}, pageData);
    const mdString = n2m.toMarkdownString(transformedMdblocks);
    const fixedString = replaceWeirdCharacters(mdString);
  
    await fs.writeFile(`${PAGES_PATH}/${slug}/index.mdx`, `${frontmatter}${fixedString}`); 
    console.info("Wrote mdx file");
    for await (const { filename, buffer } of assets) {
      await fs.writeFile(`${PAGES_PATH}/${slug}/${filename}`, buffer);
      console.info(`Wrote image buffer to '${filename}'`);
    }
  }
}

base(exportNotionPosts);

export {}