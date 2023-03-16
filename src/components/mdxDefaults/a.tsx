import Link from 'next/link'; 
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';


// fixme: add support for relative / absolute linking; test that style is consistent
export default function a(props: ChakraLinkProps) {
  if (props.href.startsWith("/")) {
    return <Link target={"_blank"} href={props.href}>{props.children}</Link>
  } else {
    return <ChakraLink target={"_blank"} {...props}>{props.children}</ChakraLink>
  }
}