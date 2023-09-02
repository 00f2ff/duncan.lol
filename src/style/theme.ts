import { extendTheme } from "@chakra-ui/react"
// https://coolors.co/ebe8e2-f6f5f1-3c3769-56609d-e07269 with the grain photo
// https://coolors.co/76d8aa-7dcbd0-e19d22-ecb837-743951
// todo: clean this up with file extensions: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles
// fixme: is it accurate to use 'sans-serif' in the fonts section?

const theme = extendTheme({
  fonts: {
    heading: `'hoss-sharp', sans-serif`,
    body: `'brandon-grotesque', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "brand.alabaster",
        fontSize: "xl",
        lineHeight: "1.5",
      },
    }
  }
});

export default theme;