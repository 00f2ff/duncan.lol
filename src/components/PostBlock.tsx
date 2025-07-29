import type { BlogPost } from "../types/blog";
import PostMetadata from "./Metadata";

export default function PostBlock(props: BlogPost) {
  return (
    <div className="mt-10">
      <a key={props.title} href={`/posts/${props.slug}`}>
        <h1 className="font-display font-semibold mb-2 text-2xl">
          {props.title}
        </h1>
        <PostMetadata {...props} />
        {props.excerpt && props.excerpt !== "undefined" && (
          <div className="text-xl mt-2">{props.excerpt}</div>
        )}
      </a>
    </div>
  );
}
