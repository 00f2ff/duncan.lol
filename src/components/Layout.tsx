import { Box, Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import theme from "style/theme";
import React from "react";
import dayjs from "dayjs";

interface Props {
  children: React.ReactNode;
  verticalSpacing?: number;
}

export default function Layout({ children, verticalSpacing }: Props) {
  const year = dayjs().format("YYYY");
  return (
    <Container 
      maxW={"full"}
    >
      <Center>
        {/* fixme: I'd like this to be farther to the left. Need to go into a columnar layout then because center centers (duh) */}
        <SimpleGrid 
          columns={1} 
          spacing={verticalSpacing ?? 10} 
          width={"45%"}
          marginTop={"50px"}
          marginBottom={"50px"}
        >
          {children}
          <Box>
            <Text>&copy; {year} Duncan McIsaac</Text>
          </Box>
        </SimpleGrid>
      </Center>
    </Container>
  )
}