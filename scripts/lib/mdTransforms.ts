import { MdBlock } from "notion-to-md/build/types";

export type PageDatum = {
  pageId: string;
  frontmatter: string;
  tags: string;
  slug: string;
}

export type ImageBuffer = {
  buffer: Buffer;
  filename: string;
}

export type QualifiedPage = {
  blocks: MdBlock[];
  assets: ImageBuffer[];
}

const NEXT_ASSET_FOLDER = "/files";

/**
 * Convert url to privacy-focused, iframe-compatible form, e.g.
 * https://www.youtube.com/watch?v=7X4-jozFVFo&t=606s --> https://www.youtube-nocookie.com/embed/7X4-jozFVFo?start=606
 * 
 * this uses regex lookahead and lookbehind: https://www.regular-expressions.info/lookaround.html
 * @param block 
 * @returns 
 */
function videoBlock(block: MdBlock): MdBlock {
  // get what's between parentheses
  const webUrl: string = block.parent.match(/\((.+)\)/)[1];
  const videoId: string = webUrl.match(/(?<=v\=)(.*?)(?=&)/)[1];
  const secondsMatch = webUrl.match(/(?<=&t=)(.*?)(?=s)/);
  const seconds = secondsMatch ? secondsMatch[1] : "0";
  return {
    type: "paragraph",
    parent: `https://www.youtube-nocookie.com/embed/${videoId}?start=${seconds}`,
    children: [],
  }
}

/**
 * Relative Notion links follow the pattern `/<page id>`
 * This function matches such links--but not external links--and replaces the page id
 * with that page's corresponding slug.
 * 
 * String.replaceAll is used to account for instances where a paragraph has multiple
 * relative links to the same page.
 * 
 * Note: DOES NOT SUPPORT NESTED RELATIVE LINKS
 * 
 * @param block 
 * @param pageData 
 * @returns 
 */
function linkSpanTransform(block: MdBlock, pageData: PageDatum[]): MdBlock {
  const relativeLinkRegex = /(?<=(\]\(\/))([\w\d]+)(?=\))/gm;
  const pageIdReplacer = (match: string): string => pageData.find((d) => d.pageId === match).slug;
  return {
    type: "paragraph",
    parent: block.parent.replaceAll(relativeLinkRegex, pageIdReplacer),
    children: [],
  }
}

/**
 * Replace tabs with spaces for code blocks
 * 
 * @param block 
 * @returns 
 */
function codeBlock(block: MdBlock): MdBlock {
  const TAB_WIDTH = 2;
  return {
    type: "code",
    parent: block.parent.replaceAll("\t", " ".repeat(TAB_WIDTH)),
    children: [],
  }
}

/**
 * Downloads an image, converts it to a buffer, and rewrites the block's image URL
 * to a relative link. Assumes that image file will be colocated with the .mdx file
 * 
 * https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 * https://stackoverflow.com/questions/10473185/regex-javascript-image-file-extension
 * 
 * @param block 
 * @param index Used to name image
 */
async function imageBlock(block: MdBlock, index: number, slug: string): Promise<[MdBlock, ImageBuffer]> {
  // const httpsLinkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
  // const httpsLinkRegex = /(?<=(\]\(\/))(.+)(?=\))/gm;
  // todo: clean up regex stuff a bit. it's kinda wonky and way to complex so I'm just using simple string search
  const url = block.parent.split("(")[1].split(")")[0]
  const fileTypeRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)/i;
  const fileType = url.match(fileTypeRegex)[0];

  // Download image
  const response: Response = await fetch(url);
  const blob: Blob = await response.blob();
  const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${slug}-block${index}${fileType}`;
  const imageBuffer: ImageBuffer = {
    buffer,
    filename,
  };

  const relativeLinkBlock: MdBlock = {
    type: "image",
    parent: `![](${NEXT_ASSET_FOLDER}/${filename})`,
    children: [],
  }

  return [relativeLinkBlock, imageBuffer];
}

/**
 * n2m doesn't differentiate between paragraph breaks and line breaks, 
 * so we need to reduce paragraph blocks into stanzas
 * 
 * @param blocks 
 */
function poetryPost(blocks: MdBlock[]): MdBlock[] { // fixme: clean up this code by flipping conditions
  // A stanza is defined as a series of paragraph blocks with non-empty parent fields, between 
  // paragraph blocks with an empty parent field
  return blocks.reduce((acc, block) => {
    if (block.type.includes("heading")) {
      return [...acc, block];
    } else if (block.type.includes("paragraph")) {
      if (block.parent === "") {
        return [...acc, block];
      } else if (acc.length === 0) { // Avoid out of bounds error
        return [...acc, block];
      } else {
        const prior = acc.pop();
        const stanzaLinePostfix = "  \n";
        prior.parent = `${prior.parent}${stanzaLinePostfix}${block.parent}`;
        return [...acc, prior];
      }
    } else {
      return [...acc, block];
    }
  }, Array<MdBlock>());
}

/**
 * Markdown block transformation pipeline
 * 
 * todo: find if block types are defined in a .d.ts file, or make an enum
 * 
 * @param frontmatterBlob 
 * @param blocks 
 * @returns 
 */
export async function transformMarkdown({ slug, tags, blocks }: {
  slug: string,
  tags: string,
  blocks: MdBlock[]
}, pageData: PageDatum[]): Promise<QualifiedPage> {
  const qualifiedPageWithBlockTransforms: QualifiedPage = await blocks.reduce(async (accPromise, block, index) => {
    const acc = await accPromise;
    switch (block.type) {
      case "video":
        return {
          blocks: [...acc.blocks, videoBlock(block)],
          assets: acc.assets,
        };
      case "paragraph":
        // Pipe more transformations here for paragraphs
        const linkTransform = linkSpanTransform(block, pageData);
        return {
          blocks: [...acc.blocks, linkTransform],
          assets: acc.assets,
        };
      case "code":
        return {
          blocks: [...acc.blocks, codeBlock(block)],
          assets: acc.assets,
        };
      case "image":
        const [relativeLinkBlock, imageBuffer] = await imageBlock(block, index, slug); 
        return {
          blocks: [...acc.blocks, relativeLinkBlock],
          assets: [...acc.assets, imageBuffer],
        };
      default:
        return {
          blocks: [...acc.blocks, block],
          assets: acc.assets,
        };
    }
  }, Promise.resolve({
    blocks: Array<MdBlock>(),
    assets: Array<ImageBuffer>(),
  }));

  if (tags.includes("Poetry")) {
    return {
      blocks: poetryPost(qualifiedPageWithBlockTransforms.blocks),
      ...qualifiedPageWithBlockTransforms
    }
  } else {
    return qualifiedPageWithBlockTransforms;
  }
}