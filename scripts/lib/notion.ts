import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionDatabaseId, notionSecretToken } from "./config";
import { NotionToMarkdown } from "notion-to-md";
import { DateProperty, MultiSelectProperty, RichTextProperty, SelectProperty, StatusProperty, TitleProperty } from "lib/notionDatabasePropertyTypes";

const notion = new Client({
  auth: notionSecretToken
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

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
        }
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

export async function getPostBySlug(slug: string) {
  return await notion.databases.query({
    database_id: notionDatabaseId,
    filter: {
      and: [
        {
          property: "Slug",
          select: {
            equals: slug
          }
        }
      ]
    }
  });
}

/**
 * Pull out page properties and convert to frontmatter. 
 * Hardcoded to my particular Notion DB setup
 * 
 * @param page 
 */
export function pagePropertiesToFrontmatter(page: PageObjectResponse) {
  const { properties } = page;
  const title = properties["Title"] as TitleProperty;
  const excerpt = properties["Excerpt"] as RichTextProperty;
  const slug = properties["Slug"] as SelectProperty;
  const tags = properties["Tags"] as MultiSelectProperty;
  const status = properties["Status"] as StatusProperty;
  const publishedOn = properties["Published On"] as DateProperty;
  const updatedOn = properties["Updated On"] as DateProperty;

  return `
  ---
  Title: ${title.title[0].plain_text}
  Excerpt: ${excerpt.rich_text[0].plain_text}
  Slug: ${slug.select.name}
  Tags: ${JSON.stringify(tags.multi_select.map((ms) => ms.name))}
  Status: ${status.status.name}
  Published On: ${publishedOn.date.start}
  Updated On: ${updatedOn.date.start}
  ---
  `;
}