import { Center, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { TfiHandPointLeft } from "react-icons/tfi";
import NextLink from 'next/link';

interface Props {
  path: string;
  text: string;
}

export default function GoBack({ path, text }: Props) {
  const key = `go-to-${path}`;
  return (
    <LinkBox 
      key={key} 
      textAlign="left"
    >
      <LinkOverlay as={NextLink} href="/" passHref>
        <Flex fontSize="2xl" fontWeight="medium">
          <Center><TfiHandPointLeft /></Center>
          <Text ml="2">{text}</Text>
        </Flex>
      </LinkOverlay>
    </LinkBox>
  );
}