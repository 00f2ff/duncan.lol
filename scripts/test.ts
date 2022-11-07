import { n2m } from "../lib/notion";
import { promises as fs } from "fs";

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

export async function mdTest() {
  const mdblocks = await n2m.pageToMarkdown("af5dcb2a372444ae9aea6d0ce34d9176");
  const mdString = n2m.toMarkdownString(mdblocks);

  await fs.writeFile("test.md", mdString);
}

base(mdTest);

export {}