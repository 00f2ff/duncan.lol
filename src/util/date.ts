import dayjs from "dayjs";
import { FrontmatterSchema } from "./files";

export function publicationDate(dates: Pick<FrontmatterSchema, "publishedOn" | "updatedOn">): string {
  const formatString = "MMMM D, YYYY";
  const baseString = `${dayjs(dates.publishedOn).format(formatString)}`
  if (dates.updatedOn && dates.updatedOn !== "undefined") {
    return `${baseString} (Updated ${dayjs(dates.updatedOn).format(formatString)})`
  } else {
    return baseString;
  }
}