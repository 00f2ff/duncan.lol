import { ReactNode } from "react"

type Props = {
  children?: ReactNode;
}

export const ul = (props: Props) => <ul className="leading-7 text-xl my-4 list-disc">{props.children}</ul>
export const ol = (props: Props) => <ol className="leading-7 text-xl my-4 list-decimal">{props.children}</ol>
export const li = (props: Props) => <li className="leading-7 text-xl my-1">{props.children}</li>
