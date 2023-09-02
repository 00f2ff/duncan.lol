/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app/**/*.{tsx,jsx,mdx}",
    "pages/**/*.{tsx,jsx,mdx}",
    "components/**/*.{tsx,jsx,mdx}",
    "content/**/*.{tsx,jsx,mdx}",
  ],
  theme: {
    // fixme: rename these and look into shades, not just different complementaries
    colors: {
      white: "#ffffff",
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
    // see https://tailwindcss.com/docs/font-family#setting-the-font-family
    // also consider using prose: https://tailwindcss.com/docs/typography-plugin
    fontFamily: {
      heading: ["hoss-sharp", "sans-serif"],
      body: ["brandon-grotesque", "sans-serif"],
      mono: ["droid-sans-mono", "sans-serif"],
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

