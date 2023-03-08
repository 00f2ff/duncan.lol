
import { Box, useStyleConfig } from "@chakra-ui/react";

type Props = {
  keyPrefix: string;
  tagName: string;
}

export default function Pill({keyPrefix, tagName}: Props) {
  const styles = useStyleConfig("Pill", { variant: tagName.toLocaleLowerCase() })
  return (
    <Box
      __css={styles}
      key={`${keyPrefix}-${tagName}`}
    >
      &nbsp;{tagName}&nbsp;
    </Box>
  )
}