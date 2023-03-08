import { extendTheme } from "@chakra-ui/react"

// todo: clean this up with file extensions: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles
// fixme: is it accurate to use 'sans-serif' in the fonts section?
// fixme: is `code` the right way to frame the monospace font, or do I want to do a custom component style in Chakra?

const theme = extendTheme({
  colors: {
    brand: {
      blue: "#3E498C",
      mint: "#79D9A3",
      offwhite: "#F2F1EB",
      yellow: "#F2B33D",
      coral: "#F28066",
      red: "#D92525",
    },
  },
  fonts: {
    heading: `'hoss-sharp', sans-serif`,
    body: `'brandon-grotesque', sans-serif`,
    code: `'droid-sans-mono', sans-serif`
  },
  styles: {
    global: {
      body: {
        bg: "brand.offwhite"
      }
    }
  }
});

export default theme;