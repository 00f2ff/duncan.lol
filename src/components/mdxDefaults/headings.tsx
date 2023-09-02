type Props = {
  children?: string;
}

export const h1 = (props: Props) => <h2 className="font-heading text-5xl mt-6">{props.children}</h2>
export const h2 = (props: Props) => <h2 className="font-heading text-4xl mt-6">{props.children}</h2>
export const h3 = (props: Props) => <h2 className="font-heading text-3xl mt-6">{props.children}</h2>

// Notion doesn't currently support headings below level 3, so this shouldn't matter
