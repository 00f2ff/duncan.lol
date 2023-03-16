import { Box, Text } from "@chakra-ui/react";

export default function CaptionBar() {
  const copy = "I'm interested in using technology to build human trust, stability and resiliency.";
  return (
    <Box>
      <Text fontSize={"xl"} color="brand.spaceCadet">{copy}</Text>
    </Box>
  )
}