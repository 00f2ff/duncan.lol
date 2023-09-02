import { FrontmatterSchema } from "util/files";
import NextLink from 'next/link';
import PostMetadata from "./Metadata";

export default function PostBlock(props: FrontmatterSchema) {
  return (
    <div className="mt-10">
      <NextLink key={props.title} href={props.path} >
        <h2 className="font-heading font-semibold text-4xl mb-2">{props.title}</h2>
        <PostMetadata {...props} />
        {
          props.excerpt && props.excerpt !== "undefined" && <div className="text-lg mt-2">{props.excerpt}</div>
        }
      </NextLink>
    </div>
  );
}