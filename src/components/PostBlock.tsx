import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { FrontmatterSchema } from "util/files";
// import theme from "style/theme";
import NextLink from 'next/link';
import Metadata from "./Metadata";

export default function PostBlock(props: FrontmatterSchema) {
  return (
    <LinkBox 
      key={props.title} 
      textAlign="left"
    >
      <LinkOverlay as={NextLink} href={props.path} passHref>
        <Heading size="md" mb="2">{props.title}</Heading>
        <Metadata {...props} />
        {
          props.excerpt && props.excerpt !== "undefined" && <Text fontSize="md">{props.excerpt}</Text>
        }
      </LinkOverlay>
    </LinkBox>
  );
}