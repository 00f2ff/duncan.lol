import Link from 'next/link'; 
import { ReactNode } from 'react';

const anchorProps = {
  target: "_blank",
  style: {
    textDecoration: "underline"
  }
}

type Props = {
  href: string;
  children?: ReactNode;
}

export default function a(props: Props) {
  if (props.href.startsWith("/")) {
    return <Link href={props.href} {...anchorProps}>{props.children}</Link>
  } else {
    return <a href={props.href} {...anchorProps}>{props.children}</a>
  }
}