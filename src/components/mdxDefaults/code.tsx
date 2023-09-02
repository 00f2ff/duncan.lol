import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
}

export default function code(props: Props) {
  const languageMatch = props.className?.match(/language-(\w+)/);
  const language = `language-${languageMatch ? languageMatch[1] : "plaintext"}`;
  const multiline = props.children.toString().includes("\n");

  return multiline ? <pre><code className={language}>{props.children.toString()}</code></pre> : <code className={language}>{props.children.toString()}</code>;
}