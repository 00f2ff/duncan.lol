import { Flex, Link, Icon } from "@chakra-ui/react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export default function Socials() {
  return (
    <Flex gap={3}>
      <Link target={"_blank"} href="https://www.linkedin.com/in/dmcisaac/">
        <Icon as={AiFillLinkedin} />
      </Link>
      <Link target={"_blank"} href="https://github.com/00f2ff">
        <Icon as={AiFillGithub} />
      </Link>
    </Flex>
  )
}