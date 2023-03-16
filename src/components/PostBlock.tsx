import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { FrontmatterSchema } from "util/files";
// import theme from "style/theme";
import NextLink from 'next/link';
import PostMetadata from "./Metadata";

export default function PostBlock(props: FrontmatterSchema) {
  return (
    <LinkBox 
      key={props.title} 
      textAlign="left"
    >
      <LinkOverlay as={NextLink} href={props.path} passHref>
        <Heading size="lg" mb="2">{props.title}</Heading>
        <PostMetadata {...props} />
        {
          props.excerpt && props.excerpt !== "undefined" && <Text fontSize="lg">{props.excerpt}</Text>
        }
      </LinkOverlay>
    </LinkBox>
  );
}