import {
  frontmatterBlobToString,
  getPageMarkdown,
  getPublishedPosts,
  pagePropertiesToFrontmatterBlob,
} from "./lib/notion";
import { promises as fs } from "fs";
import { uuidToPageId } from "./util/string";
import { postProcessNFM } from "./lib/mdTransforms";

const PAGES_PATH = "../src/content/posts";
const PUBLIC_PATH = "../public/files";

type ExportablePage = {
  pageId: string;
  frontmatter: string;
  tags: string;
  slug: string;
};

async function exportNotionPosts() {
  const posts = await getPublishedPosts();

  const pages: ExportablePage[] = posts.map((post) => {
    const frontmatterBlob = pagePropertiesToFrontmatterBlob(post);
    return {
      pageId: uuidToPageId(post.id),
      frontmatter: frontmatterBlobToString(frontmatterBlob),
      tags: frontmatterBlob.Tags,
      slug: frontmatterBlob.Slug,
    };
  });

  // Map of (dash-stripped) page id -> slug for rewriting internal links.
  const pageIdToSlug = new Map(pages.map((p) => [p.pageId, p.slug]));

  await fs.mkdir(PAGES_PATH, { recursive: true });
  await fs.mkdir(PUBLIC_PATH, { recursive: true });

  for (const { pageId, frontmatter, tags, slug } of pages) {
    console.info(`Converting page slug ${slug}`);

    const { markdown, truncated, unknownBlockIds } =
      await getPageMarkdown(pageId);
    if (truncated || unknownBlockIds.length > 0) {
      console.warn(
        `  ⚠️  ${slug}: markdown truncated=${truncated}, ` +
          `${unknownBlockIds.length} unknown block(s) — review this post.`,
      );
    }

    const { markdown: processed, assets } = await postProcessNFM(markdown, {
      slug,
      tags,
      pageIdToSlug,
    });

    await fs.writeFile(`${PAGES_PATH}/${slug}.md`, `${frontmatter}${processed}`);
    console.info(`  Wrote ${slug}.md`);

    for (const { filename, buffer } of assets) {
      await fs.writeFile(`${PUBLIC_PATH}/${filename}`, buffer);
      console.info(`  Wrote asset ${filename}`);
    }
  }

  console.info(`Done. Exported ${pages.length} post(s).`);
}

await exportNotionPosts();
