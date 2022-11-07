import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionDatabaseId, notionSecretToken } from "./config";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: notionSecretToken
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

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

  const isPageObjectResponse = (r: PageObjectResponse | PartialPageObjectResponse): boolean => "properties" in r;

  // Type narrowing not working :/
  return postsObject.results.filter(isPageObjectResponse).map((r) => r as PageObjectResponse);
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