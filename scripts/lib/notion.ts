import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionDatabaseId, notionSecretToken } from "../util/config";
import { NotionToMarkdown } from "notion-to-md";
import { DateProperty, MultiSelectProperty, RichTextProperty, SelectProperty, StatusProperty, TitleProperty } from "lib/notionDatabasePropertyTypes";

const notion = new Client({
  auth: notionSecretToken
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

// Custom transformer for YouTube embeds
// fixme: this isn't working
// n2m.setCustomTransformer("embed", async (block) => {
//   const { embed } = block as any;
//   if (!embed?.url) return "";
//   const url = embed.url as string;
//   if (!url.includes("www.youtube.com")) return "";
//   return `<iframe src="${url}"></iframe>`;
// });

/**
 * Type predicate for Notion response types
 * 
 * @param response 
 * @returns 
 */
function isPageObjectResponse(response: PageObjectResponse | PartialPageObjectResponse): response is PageObjectResponse {
  return (response as PageObjectResponse).properties !== undefined;
}

export async function getPublishedPosts(): Promise<PageObjectResponse[]> {
  const postsObject = await notion.databases.query({
    database_id: notionDatabaseId,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published"
          }
        }, 
        // Uncomment for testing specific post transformations
        // {
        //   property: "Title",
        //   title: {
        //     contains: "Wizard"
        //   }
        // },
        // {
        //   property: "Tags",
        //   multi_select: {
        //     contains: "Poetry"
        //   }
        // }
      ]
    },
    sorts: [
      {
        property: "Published On",
        direction: "descending"
      }
    ]
  });

  return postsObject.results.filter(isPageObjectResponse);
}

/**
 * Colons (and maybe other special characters) cause next-mdx-remote to throw YAML formatting exceptions
 * @param s 
 * @returns 
 */
function sanitizeYAML(s: string): string {
  return s.replace(/:/, "&#58;")
}

/**
 * Pull out page properties and convert to an object that can be easily converted to frontmatter. 
 * Hardcoded to my particular Notion DB setup
 * 
 * @param page 
 */
export function pagePropertiesToFrontmatterBlob(page: PageObjectResponse): { [key: string]: string } {
  const { properties } = page;
  const titleProperty = properties["Title"] as TitleProperty;
  const title = titleProperty.title[0].plain_text
  const sanitizedTitle = sanitizeYAML(title);

  const excerptProperty = properties["Excerpt"] as RichTextProperty;
  const excerpt: string | undefined = excerptProperty.rich_text[0]?.plain_text;
  const sanitizedExcerpt = excerpt ? sanitizeYAML(excerpt) : "";

  const slug = properties["Slug"] as SelectProperty;
  const tags = properties["Tags"] as MultiSelectProperty;
  const status = properties["Status"] as StatusProperty;
  const publishedOn = properties["Published On"] as DateProperty;
  const updatedOn = properties["Updated On"] as DateProperty;

  return {
    "Title": sanitizedTitle,
    "Excerpt": sanitizedExcerpt,
    "Slug": slug.select.name,
    "Tags": JSON.stringify(tags.multi_select.map((ms) => ms.name)),
    "Status": status.status.name,
    "Published On": publishedOn.date.start,
    "Updated On": updatedOn.date?.start
  }
}

export function frontmatterBlobToString(blob: { [key: string]: string }): string {
  const str = Object.keys(blob).reduce((acc, key) => `${acc}${key}: ${blob[key]}\n`, "");
  return `---
${str}
---
`;
}