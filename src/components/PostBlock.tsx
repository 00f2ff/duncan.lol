import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FrontmatterSchema } from "util/files";
import NextLink from 'next/link'


export default function PostBlock(props: FrontmatterSchema) {
  const dateString = (() => {
    const formatString = "MMMM D, YYYY";
    const baseString = `${dayjs(props.publishedOn).format(formatString)}`
    if (props.updatedOn) {
      return `${baseString} (Updated ${dayjs(props.updatedOn).format(formatString)})`
    } else {
      return baseString;
    }
  })();

  return (
    <LinkBox 
      key={props.title} 
      textAlign="left"
    >
      <NextLink href={props.path} passHref>
        <LinkOverlay>
          <Heading size="md" mb="2">{props.title}</Heading>
          <Text fontSize="md" mb="1">{dateString}</Text>
          <Text fontSize="md">{props.excerpt}</Text>
        </LinkOverlay>
      </NextLink>        
    </LinkBox>
  );
}