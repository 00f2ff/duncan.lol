import { ListProps, UnorderedList, OrderedList, ListItemProps, ListItem } from "@chakra-ui/react"
import { commonProps } from "./common"

export const ul = (props: ListProps) => <UnorderedList {...commonProps} {...props}></UnorderedList> 
export const ol = (props: ListProps) => <OrderedList {...commonProps} {...props}></OrderedList>
export const li = (props: ListItemProps) => <ListItem mb={1} {...commonProps} {...props}>{props.children}</ListItem>
