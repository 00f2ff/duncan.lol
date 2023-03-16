import { ListProps, UnorderedList, OrderedList, ListItemProps, ListItem } from "@chakra-ui/react"

export const ul = (props: ListProps) => <UnorderedList spacing={2} {...props}></UnorderedList> 
export const ol = (props: ListProps) => <OrderedList spacing={2} {...props}></OrderedList>
export const li = (props: ListItemProps) => <ListItem {...props}>{props.children}</ListItem>
