// import { Link as NextLink } from 'next/link'; // todo: add support for relative / absolute linking
import { BoxProps, Heading, Link as ChakraLink, LinkProps as ChakraLinkProps, ListItem, ListItemProps, ListProps, OrderedList, TextProps, UnorderedList, Text } from '@chakra-ui/react';
// import Image from 'next/image';

// see https://github.com/knowankit/knowankit.com/blob/develop/components/mdx/index.tsx
// todo: need to make sure any theming 

const a = (props: ChakraLinkProps) => <ChakraLink target={"_blank"} {...props}>{props.children}</ChakraLink>

const h1 = (props: BoxProps) => <Heading size={"2xl"} {...props}/>
const h2 = (props: BoxProps) => <Heading size={"xl"} {...props}/>
const h3 = (props: BoxProps) => <Heading size={"lg"} {...props}/>
const h4 = (props: BoxProps) => <Heading size={"md"} {...props}/>
const h5 = (props: BoxProps) => <Heading size={"sm"} {...props}/>

const ul = (props: ListProps) => <UnorderedList {...props}></UnorderedList> 
const ol = (props: ListProps) => <OrderedList {...props}></OrderedList>
const li = (props: ListItemProps) => <ListItem {...props}>{props.children}</ListItem>

// fixme: why does fontSize=md for p equal 16, but 20 on index?

const p = (props: TextProps) => <Text fontSize={"md"} {...props}>{props.children}</Text>

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
};

export default components;