import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["brandon-text", "system-ui", "sans-serif"], // Primary text
        mono: ["droid-sans-mono", "Consolas", "monospace"], // Code blocks
        display: ["hoss-sharp", "brandon-text", "sans-serif"], // Headlines/display
      },
    },
  },
} satisfies Config;
