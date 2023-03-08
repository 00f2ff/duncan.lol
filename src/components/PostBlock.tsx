import { Box, Center, Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FrontmatterSchema } from "util/files";
// import theme from "style/theme";
import NextLink from 'next/link';
import Pill from "./Pill";

// Flags
const SHOW_TAGS: boolean = true;

export default function PostBlock(props: FrontmatterSchema) {
  const dateString = (() => {
    const formatString = "MMMM D, YYYY";
    const baseString = `${dayjs(props.publishedOn).format(formatString)}`
    if (props.updatedOn && props.updatedOn !== "undefined") {
      return `${baseString} (Updated ${dayjs(props.updatedOn).format(formatString)})`
    } else {
      return baseString;
    }
  })();

  const pills = props.tags.map((tag) => Pill({keyPrefix: props.title, tagName: tag}));

  return (
    <LinkBox 
      key={props.title} 
      textAlign="left"
    >
      <NextLink href={props.path} passHref>
        <LinkOverlay>
          <Heading size="md" mb="2">{props.title}</Heading>
          <Flex mb="1">
            <Text fontSize="md">{dateString} </Text>
            {
              SHOW_TAGS && <Center>{pills}</Center>
            }
          </Flex>
          {
            props.excerpt && props.excerpt !== "undefined" && <Text fontSize="md">{props.excerpt}</Text>
          }
          
        </LinkOverlay>
      </NextLink>        
    </LinkBox>
  );
}