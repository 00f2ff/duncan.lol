import Link from 'next/link'; 
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

const anchorProps = {
  target: "_blank",
  style: {
    textDecoration: "underline"
  }
}

export default function a(props: ChakraLinkProps) {
  if (props.href.startsWith("/")) {
    return <Link href={props.href} {...anchorProps}>{props.children}</Link>
  } else {
    return <ChakraLink {...props} {...anchorProps}>{props.children}</ChakraLink>
  }
}