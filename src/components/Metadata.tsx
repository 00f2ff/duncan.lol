import type { BlogPost } from "../types/blog";
import { publicationDate } from "../utils/date";
import Pill from "./Pill";

// Flags
const SHOW_TAGS: boolean = true;

export default function PostMetadata(props: BlogPost) {
  const dateString = publicationDate(props);

  const pills = [props.status, ...props.tags].map((tag) => Pill({keyPrefix: props.title, tagName: tag}));

  return (
    <div className="flex justify-left items-center mb-2 text-lg">
      <span>{`${dateString} `}</span>
      {
        SHOW_TAGS && <div className="ml-2 flex gap-x-2">{pills}</div>
      }
    </div>
  )
}