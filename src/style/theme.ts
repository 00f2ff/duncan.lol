import { extendTheme } from "@chakra-ui/react"
import Pill from "./component/Pill";
// https://coolors.co/ebe8e2-f6f5f1-3c3769-56609d-e07269 with the grain photo
// https://coolors.co/76d8aa-7dcbd0-e19d22-ecb837-743951
// todo: clean this up with file extensions: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles
// fixme: is it accurate to use 'sans-serif' in the fonts section?

const theme = extendTheme({
  colors: {
    brand: {
      alabaster: "#ebe8e2",
      isabelline: "#f6f5f1",
      duncan: "#00F2FF",
      delftBlue: "#3c3769",
      spaceCadet: "#262343",
      ultraViolet: "#56609d",
      lightCoral: "#e07269",
      celadon: "#76d8aa",
      tiffanyBlue: "#7dcbd0",
      harvestGold: "#e19d22",
      xanthous: "#ecb837",
      quinacridoneMagenta: "#743951",
      red: "#D92525",
      persianOrange: "#CB9173",
      olivine: "#8CB369",
      hunterGreen: "#415D43",
      vistaBlue: "#8EA4D2",
    },
  },
  fonts: {
    heading: `'hoss-sharp', sans-serif`,
    body: `'brandon-grotesque', sans-serif`,
    mono: `'droid-sans-mono', sans-serif`
  },
  styles: {
    global: {
      body: {
        bg: "brand.alabaster",
        fontSize: "xl",
        lineHeight: "1.5",
      },
      "p strong": {
        fontWeight: "500"
      },
      blockquote: {
        fontFamily: `'hoss-sharp', sans-serif`,
        fontStyle: "italic",
      },
      pre: {
        fontFamily: `'droid-sans-mono', sans-serif`,
        fontSize: "md",
      },
      code: {
        fontFamily: `'droid-sans-mono', sans-serif`,
        fontSize: "md",
      }
    }
  },
  components: {
    Pill,
    Heading: {
      baseStyle: {
        fontWeight: "600"
      }
    },
    Code: {
      baseStyle: {
        fontFamily: `'droid-sans-mono', sans-serif`,
        fontSize: "md",
      }
    }
  }
});

export default theme;