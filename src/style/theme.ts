import { extendTheme } from "@chakra-ui/react"
import Pill from "./component/Pill";
// https://coolors.co/ebe8e2-f6f5f1-3c3769-56609d-e07269 with the grain photo
// https://coolors.co/76d8aa-7dcbd0-e19d22-ecb837-743951
// todo: clean this up with file extensions: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles
// fixme: is it accurate to use 'sans-serif' in the fonts section?
// fixme: is `code` the right way to frame the monospace font, or do I want to do a custom component style in Chakra?

const theme = extendTheme({
  colors: {
    brand: {
      alabaster: "#ebe8e2",
      isabelline: "#f6f5f1",
      blue: "#3E498C",
      delftBlue: "#3c3769",
      ultraViolet: "#56609d",
      lightCoral: "#e07269",
      celadon: "#76d8aa",
      tiffanyBlue: "#7dcbd0",
      harvestGold: "#e19d22",
      xanthous: "#ecb837",
      quinacridoneMagenta: "#743951",
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
        bg: "brand.alabaster"
      }
    }
  },
  components: {
    Pill,
  }
});

export default theme;