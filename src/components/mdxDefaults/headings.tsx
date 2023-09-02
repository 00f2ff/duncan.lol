type Props = {
  children?: string;
}

// todo: doesn't look like semibold is working
export const h1 = (props: Props) => <h1 className="font-heading font-semibold text-5xl mt-6">{props.children}</h1>
export const h2 = (props: Props) => <h2 className="font-heading font-semibold text-4xl mt-6">{props.children}</h2>
export const h3 = (props: Props) => <h3 className="font-heading font-semibold text-3xl mt-6">{props.children}</h3>

// Notion doesn't currently support headings below level 3, so this shouldn't matter
