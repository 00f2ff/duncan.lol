import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['brandon-grotesque', 'system-ui', 'sans-serif'],      // Primary text
        mono: ['droid-sans-mono', 'Consolas', 'monospace'],         // Code blocks
        display: ['hoss-sharp', 'brandon-grotesque', 'sans-serif'], // Headlines/display
      }
    },
    colors: {
      alabaster: "#ebe8e2",
    }
  },
} satisfies Config