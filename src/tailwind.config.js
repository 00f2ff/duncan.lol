/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app/**/*.{tsx,jsx,mdx}",
    "pages/**/*.{tsx,jsx,mdx}",
    "components/**/*.{tsx,jsx,mdx}",
    "content/**/*.{tsx,jsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#F2F0EB",
      alabaster: "#ebe8e2",
      duncan: "#00F2FF",
      blue: "#A8B9BF",
      coral: "#BF665E",
      lightBlue: "#D2D7D9",
      green: "#5A735B",
      deepRed: "#731010",
      orange: "#D9601A",
      deepBlue: "#495473",
      lightGreen: "#B0BFB4",
      marble: "#F2F0EB",
      deepGreen: "#15261B",
      gold: "#D98825",
      deepViolet: "#594858",
      violetGray: "#A69CA3"
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

