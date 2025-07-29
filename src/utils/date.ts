import dayjs from "dayjs";
import type { BlogPost } from "../types/blog";

export function publicationDate(
  dates: Pick<BlogPost, "publishedOn" | "updatedOn">,
): string {
  const formatString = "MMMM D, YYYY";
  const baseString = `${dayjs(dates.publishedOn).format(formatString)}`;
  if (dates.updatedOn && dates.updatedOn !== "undefined") {
    return `${baseString} (Updated ${dayjs(dates.updatedOn).format(formatString)})`;
  } else {
    return baseString;
  }
}
