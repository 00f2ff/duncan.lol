import { Box, Divider, Flex, Stack, Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function blockquote(props: {children: ReactNode}) {
  return (
    <Stack direction='row' spacing={2}>
      <Box 
        height="100%" 
        width="3" 
        backgroundColor="brand.delftBlue"
        borderRadius={"sm"}
      ></Box>
      <blockquote>{props.children}</blockquote>
    </Stack>
  )
}