import { MdBlock } from "notion-to-md/build/types";

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
 * n2m doesn't differentiate between paragraph breaks and line breaks, 
 * so we need to reduce paragraph blocks into stanzas
 * 
 * @param blocks 
 */
function poetryPost(blocks: MdBlock[]): MdBlock[] {
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
export function transformMarkdown(tags: string, blocks: MdBlock[]): MdBlock[] {
  const individualTransforms = blocks.map((block) => {
    switch (block.type) {
      case "video":
        return videoBlock(block);
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