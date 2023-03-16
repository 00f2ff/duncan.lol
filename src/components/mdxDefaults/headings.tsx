import { BoxProps, Heading } from "@chakra-ui/react"

export const h1 = (props: BoxProps) => <Heading marginTop={"25px"} size={"2xl"} {...props}/>
export const h2 = (props: BoxProps) => <Heading marginTop={"25px"} size={"xl"} {...props}/>
export const h3 = (props: BoxProps) => <Heading marginTop={"25px"} size={"lg"} {...props}/>

// Notion doesn't currently support headings below level 3, so this shouldn't matter
export const h4 = (props: BoxProps) => <Heading size={"md"} {...props}/>
export const h5 = (props: BoxProps) => <Heading size={"sm"} {...props}/>