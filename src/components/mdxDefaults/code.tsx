import { Code, CodeProps } from "@chakra-ui/react";
import dynamic from 'next/dynamic'

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false,
})

export default function code(props: CodeProps) {
  const languageMatch = props.className?.match(/language-(\w+)/);

  return languageMatch 
    ? <SyntaxHighlighter language={languageMatch[1]}>{props.children.toString()}</SyntaxHighlighter>
    : <Code>{props.children}</Code>
}