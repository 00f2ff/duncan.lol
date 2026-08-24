import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client";
import { notionDatabaseId, notionSecretToken } from "../util/config";
import {
  DateProperty,
  MultiSelectProperty,
  RichTextProperty,
  SelectProperty,
  StatusProperty,
  TitleProperty,
} from "./notionDatabasePropertyTypes";

/**
 * The markdown endpoints (`pages.retrieveMarkdown`) require API version
 * 2026-03-11. The data source query API (used by getPublishedPosts) is
 * available from 2025-09-03 onward, so a single pinned version covers both.
 */
const notion = new Client({
  auth: notionSecretToken,
  notionVersion: "2026-03-11",
});

/**
 * Type predicate for Notion response types
 */
function isPageObjectResponse(
  response: PageObjectResponse | PartialPageObjectResponse,
): response is PageObjectResponse {
  return (response as PageObjectResponse).properties !== undefined;
}

/**
 * As of API version 2025-09-03 a database is a container for one or more data
 * sources, and queries target a data source rather than the database itself.
 * Discover the (first) data source id at runtime so we don't need a new env var.
 */
async function getDataSourceId(): Promise<string> {
  const database = await notion.databases.retrieve({
    database_id: notionDatabaseId,
  });
  const dataSources =
    "data_sources" in database ? database.data_sources : undefined;
  if (!dataSources || dataSources.length === 0) {
    throw new Error(
      `No data sources found for database ${notionDatabaseId}. ` +
        `Ensure the integration has access and the database has at least one data source.`,
    );
  }
  return dataSources[0].id;
}

export async function getPublishedPosts(): Promise<PageObjectResponse[]> {
  const dataSourceId = await getDataSourceId();
  const postsObject = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        {
          property: "Published On",
          date: {
            is_not_empty: true,
          },
        },
        // Todo: fix poetry formatting & configure this + Notion for CMS-level delisting
        {
          property: "Slug",
          select: {
            does_not_equal: "im-feeling-america",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Published On",
        direction: "descending",
      },
    ],
  });

  return postsObject.results.filter(isPageObjectResponse);
}

export type PageMarkdown = {
  markdown: string;
  truncated: boolean;
  unknownBlockIds: string[];
};

/**
 * Fetch a page's content as Notion-flavored Markdown via the first-party
 * markdown endpoint. Replaces the previous notion-to-md block conversion.
 */
export async function getPageMarkdown(pageId: string): Promise<PageMarkdown> {
  const response = await notion.pages.retrieveMarkdown({ page_id: pageId });
  return {
    markdown: response.markdown,
    truncated: response.truncated,
    unknownBlockIds: response.unknown_block_ids ?? [],
  };
}

/**
 * Colons (and maybe other special characters) cause the frontend YAML parser
 * (front-matter) to throw formatting exceptions. The frontend decodes these
 * back via decodeHTML, so the escape is round-tripped.
 */
function sanitizeYAML(s: string): string {
  return s.replace(/:/, "&#58;");
}

/**
 * Pull out page properties and convert to an object that can be easily converted to frontmatter.
 * Hardcoded to my particular Notion DB setup
 */
export function pagePropertiesToFrontmatterBlob(page: PageObjectResponse): {
  [key: string]: string;
} {
  const { properties } = page;
  const titleProperty = properties["Title"] as TitleProperty;
  const title = titleProperty.title[0].plain_text;
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
    Title: sanitizedTitle,
    Excerpt: sanitizedExcerpt,
    Slug: slug.select.name,
    Tags: JSON.stringify(tags.multi_select.map((ms) => ms.name)),
    Status: status.status.name,
    "Published On": publishedOn.date.start,
    "Updated On": updatedOn.date?.start,
  };
}

export function frontmatterBlobToString(blob: {
  [key: string]: string;
}): string {
  const str = Object.keys(blob).reduce(
    (acc, key) => `${acc}${key}: ${blob[key]}\n`,
    "",
  );
  return `---
${str}
---
`;
}
