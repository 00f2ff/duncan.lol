import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
}

export default function code(props: Props) {
  const languageMatch = props.className?.match(/language-(\w+)/);
  const language = `language-${languageMatch ? languageMatch[1] : "plaintext"}`;
  const multiline = props.children.toString().includes("\n");
  const codeNode = <code className={`${language} font-mono text-base`}>{props.children.toString()}</code>;

  return multiline ? <pre>{codeNode}</pre> : codeNode;
}