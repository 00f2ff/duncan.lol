import { Box, Center, Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FrontmatterSchema } from "util/files";
// import theme from "style/theme";
import NextLink from 'next/link';

// fixme: make badge colors a theme variant. for now just using this enum.
// fixme: decide if it's worth it trying to get badges to work

enum tagColors {
  Organizations = "brand.mint",
}

function Pill(keyPrefix: string, tagName: string) {
  return (
    <Box
      key={`${keyPrefix}-${tagName}`}
      backgroundColor={tagColors[tagName]}
      padding="1px"
      borderRadius="md"
      marginLeft="3"
      fontWeight="500" 
      fontSize="md"
    >
      &nbsp;{tagName}&nbsp;
    </Box>
  )
}

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

  const pills = props.tags.map((tag) => Pill(props.title, tag));

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
            <Center>
              {pills}
            </Center>
          </Flex>
          
          <Text fontSize="md">{props.excerpt}</Text>
        </LinkOverlay>
      </NextLink>        
    </LinkBox>
  );
}