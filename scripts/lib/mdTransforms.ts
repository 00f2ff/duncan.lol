import { MdBlock } from "notion-to-md/build/types";

export type PageDatum = {
  pageId: string;
  frontmatter: string;
  tags: string;
  slug: string;
}

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
 * @param frontmatterBlob 
 * @param blocks 
 * @returns 
 */
export function transformMarkdown({tags, blocks}: {
  tags: string,
  blocks: MdBlock[]
}, pageData: PageDatum[]): MdBlock[] {
  const individualTransforms = blocks.map((block) => {
    switch (block.type) {
      case "video":
        return videoBlock(block);
      case "paragraph":
        // Pipe more transformations here for paragraphs
        const linkTransform = linkSpanTransform(block, pageData);
        return linkTransform;
      default:
        return block;
    }
  });

  if (tags.includes("Poetry")) {
    return poetryPost(individualTransforms);
  } else {
    return individualTransforms;
  }
}