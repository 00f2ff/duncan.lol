import { ReactNode } from "react"

type Props = {
  children?: ReactNode;
}

export const ul = (props: Props) => <ul className="my-4 list-disc">{props.children}</ul>
export const ol = (props: Props) => <ol className="my-4 list-decimal">{props.children}</ol>
export const li = (props: Props) => <li className="my-1">{props.children}</li>
