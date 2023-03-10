import { Code, CodeProps } from "@chakra-ui/react";

const LANGUAGE_DEFAULT = "typescript";

// fixme: support fenced code vs inline code blocks
// fixme: add syntax highlighting, ideally compile-time

export default function HighlightedCode(props: CodeProps) {
  return (
    <Code 
      // width="100%" 
      // overflowX="scroll" 
      {...props}
    >
      {props.children}
    </Code>
  );
}