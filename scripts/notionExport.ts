import { frontmatterBlobToString, getPublishedPosts, n2m, pagePropertiesToFrontmatterBlob } from "./lib/notion";
import { promises as fs } from "fs";
import { replaceWeirdCharacters, uuidToPageId } from "./util/string";
import { MdBlock } from "notion-to-md/build/types";

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

export async function exportNotionPosts() { // fixme: add better typing. maybe make the frontmatter stuff a class with a toString
  const posts = await getPublishedPosts(); 

  const pageData: { [pageId: string]: string } = posts.reduce((acc, post) => {
    const pageId = uuidToPageId(post.id);
    const frontmatterBlob = pagePropertiesToFrontmatterBlob(post);
    const slug = frontmatterBlob.Slug;
    const frontmatter = frontmatterBlobToString(frontmatterBlob);
    acc[pageId] = {
      frontmatter,
      slug,
    };
    return acc;
  }, {})

  // todo: break this out into more pipeline steps
  for await (const id of Object.keys(pageData)) {
    console.info(`Converting page id ${id}`);
    const mdblocks: MdBlock[] = await n2m.pageToMarkdown(id);
    const transformedMdblocks: MdBlock[] = mdblocks.map((block) => {
      if (block.type === "video") {
        const webUrl: string = block.parent.match(/\((.+)\)/)[1]; // get what's between parentheses
        // Convert url to privacy-focused, iframe-compatible form, e.g.
        // https://www.youtube.com/watch?v=7X4-jozFVFo&t=606s -->
        // https://www.youtube-nocookie.com/embed/7X4-jozFVFo?start=606
        // this uses regex lookahead and lookbehind: https://www.regular-expressions.info/lookaround.html
        const videoId: string = webUrl.match(/(?<=v\=)(.*?)(?=&)/)[1];
        const secondsMatch = webUrl.match(/(?<=&t=)(.*?)(?=s)/);
        const seconds = secondsMatch ? secondsMatch[1] : "0";
        return {
          type: "paragraph",
          parent: `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?start=${seconds}"></iframe>`,
          children: [],
        }
      } else {
        return block;
      }
    })

    const mdString = n2m.toMarkdownString(transformedMdblocks);

    const frontmatter = pageData[id]["frontmatter"];
    const slug = pageData[id]["slug"];
    const fixedString = replaceWeirdCharacters(mdString);
  
    await fs.writeFile(`${PAGES_PATH}${slug}.mdx`, `${frontmatter}${fixedString}`); 
  }
}

base(exportNotionPosts);

export {}