import { ReactNode } from "react"

type Props = {
  children?: ReactNode;
}

export const ul = (props: Props) => <ul className="mb-1">{props.children}</ul>
export const ol = (props: Props) => <ol className="mb-1">{props.children}</ol>
export const li = (props: Props) => <li>{props.children}</li>
