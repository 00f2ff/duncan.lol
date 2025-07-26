import type { BlogPost } from "../types/blog";
import PostMetadata from "./Metadata";

export default function PostBlock(props: BlogPost) {
  return (
    <div className="mt-10">
      <a key={props.title} href={`/post/${props.slug}`} >
        <h2 className="font-display font-semibold text-4xl mb-2">{props.title}</h2>
        <PostMetadata {...props} />
        {
          props.excerpt && props.excerpt !== "undefined" && <div className="text-xl mt-2">{props.excerpt}</div>
        }
      </a>
    </div>
  );
}