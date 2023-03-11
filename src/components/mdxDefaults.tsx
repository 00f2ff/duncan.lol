// import { Link as NextLink } from 'next/link'; // todo: add support for relative / absolute linking
import { BoxProps, Heading, Link as ChakraLink, LinkProps as ChakraLinkProps, ListItem, ListItemProps, ListProps, OrderedList, TextProps, UnorderedList, Text, CodeProps, Code, AspectRatio } from '@chakra-ui/react';
import { IframeHTMLAttributes } from 'react';
import HighlightedCode from './HighlightedCode';
// import Image from 'next/image';

// see https://github.com/knowankit/knowankit.com/blob/develop/components/mdx/index.tsx
// todo: need to make sure any theming carries over

// Common Text properties 
// todo: figure out typing so it's recognized by the list components
const commonProps = {
  fontSize: "lg",
  lineHeight: "1.5",

}

const a = (props: ChakraLinkProps) => <ChakraLink target={"_blank"} {...props}>{props.children}</ChakraLink>

const h1 = (props: BoxProps) => <Heading size={"2xl"} {...props}/>
const h2 = (props: BoxProps) => <Heading size={"xl"} {...props}/>
const h3 = (props: BoxProps) => <Heading size={"lg"} {...props}/>

// Notion doesn't currently support headings below level 3, so this shouldn't matter
const h4 = (props: BoxProps) => <Heading size={"md"} {...props}/>
const h5 = (props: BoxProps) => <Heading size={"sm"} {...props}/>

const ul = (props: ListProps) => <UnorderedList {...commonProps} {...props}></UnorderedList> 
const ol = (props: ListProps) => <OrderedList {...commonProps} {...props}></OrderedList>
const li = (props: ListItemProps) => <ListItem mb={1} {...commonProps} {...props}>{props.children}</ListItem>

const p = (props: TextProps) => <Text {...commonProps} {...props}>{props.children}</Text>

const code = (props: CodeProps) => <HighlightedCode {...props}>{props.children}</HighlightedCode>

const iframe = (props: any) => {
  console.log("propppppps")
  console.log(props);
  // shit, next-mdx-remote doesn't handle iframe rewrites which is why this doesn't get picked up
  return (
    <AspectRatio maxW="560px" ratio={16 / 9} >
      <iframe frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen {...props}></iframe>
    </AspectRatio>
)}

// const strong = (props: TextProps) => <Text fontWeight="medium" {...commonProps} {...props}>{props.children}</Text>

const components = {
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  ul,
  ol,
  li,
  p,
  code,
  iframe,
  // mdx-embed components exported here too: https://www.mdx-embed.com/?path=/docs/mdx-embed--page
  // fixme: there's a peer dependency violation with this, so get back to it later. update: the package hasn't been updated and is broken
  // YouTube
  // strong,
};

export default components;