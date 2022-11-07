import dotenv from "dotenv";

export const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; // can be undefined in test environments

if (isDev) {
  dotenv.config({ path: ".env.local" });
}

export const notionRootPageId = process.env.NOTION_ROOT_PAGE_ID;

export const notionDatabaseId = process.env.NOTION_DATABASE_ID;
export const notionDatabaseViewId = process.env.NOTION_DATABASE_VIEW_ID;

export const notionUserId = process.env.NOTION_USER_ID;
export const notionAuthToken = process.env.NOTION_TOKEN_V2;

export const notionSecretToken = process.env.NOTION_CONNECTION_TOKEN;

export const port = process.env.PORT || 8080;
export const rootDomain = isDev ? `http://localhost:${port}` : null;