import { Center, Flex, Text } from "@chakra-ui/react";
import { publicationDate } from "util/date";
import { FrontmatterSchema } from "util/files";
import Pill from "./Pill";

// Flags
const SHOW_TAGS: boolean = true;

export default function Metadata(props: FrontmatterSchema) {
  const dateString = publicationDate(props);

  const pills = props.tags.map((tag) => Pill({keyPrefix: props.title, tagName: tag}));

  return (
    <Flex mb="1">
      <Text fontSize="md">{dateString} </Text>
      {
        SHOW_TAGS && <Center>{pills}</Center>
      }
    </Flex>
  )
}