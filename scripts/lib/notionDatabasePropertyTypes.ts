import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * Notion types copied from their declaration files that don't have well-named exports.
 * Be careful about updating the notion client library
 */

export type RichTextProperty = {
  type: "rich_text";
  rich_text: Array<RichTextItemResponse>;
  id: string;
};

export type DateResponse = {
  start: string;
  end: string | null;
};

export type DateProperty = {
  type: "date";
  date: DateResponse | null;
  id: string;
};

export type SelectPropertyResponse = {
  id: string;
  name: string;
};

export type StatusProperty = {
  type: "status";
  status: SelectPropertyResponse | null;
  id: string;
};

export type SelectProperty = {
  type: "select";
  select: SelectPropertyResponse | null;
  id: string;
};

export type MultiSelectProperty = {
  type: "multi_select";
  multi_select: Array<SelectPropertyResponse>;
  id: string;
};

export type TitleProperty = {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
};
