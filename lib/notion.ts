import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";
import { notionAuthToken, notionDatabaseId, notionSecretToken, notionUserId } from "./config";

// todo: add SF timezone
export const notionX = new NotionAPI({
  activeUser: notionUserId,
  authToken: notionAuthToken,
});

const notion = new Client({
  auth: notionSecretToken
});

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