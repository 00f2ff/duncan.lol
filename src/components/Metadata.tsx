import type { BlogPost } from "../types/blog";
import { publicationDate } from "../utils/date";
import { Topic } from "./Topics";

export default function PostMetadata(props: BlogPost) {
  const dateString = publicationDate(props);
  const tags = [props.status, ...props.tags];
  return (
    <div className="flex justify-left items-center mb-2 text-lg">
      <span className="mr-2">{`${dateString} `}</span>
      <div className="flex gap-x-2">
        {tags.map((tag) => (
          <Topic key={`topic-${tag}`} name={tag} treatment="italic" />
        ))}
      </div>
    </div>
  );
}
