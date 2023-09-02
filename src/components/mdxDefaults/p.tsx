import YouTubeEmbed from "components/mdxDefaults/YouTubeEmbed";
import { ReactNode } from "react";

// TODO: any other props we need?
type Props = {
  children?: ReactNode;
}

export default function p(props: Props) {
  // iframe check
  if (props.children?.toString().includes("https://www.youtube-nocookie.com")) {
    return <YouTubeEmbed url={props.children.toString()} />
  }
  return <p className="my-3 leading-6 text-lg">{props.children}</p>;
}