import { Container } from "@chakra-ui/react";
import theme from "style/theme";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Container 
      maxW={"full"}
    >
      {children}
    </Container>
  )
}