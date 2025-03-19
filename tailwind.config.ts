import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{vue,ts}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#E6E4D8",
          500: "#8C6D51",
        },
        black: "#323843",
        background: "#F9F9F9",
      },
    },
    fontFamily: {
      logo: '"Poppins", serif',
      primary: '"Wix Madefor Display", sans-serif',
    },
  },
  plugins: [],
} satisfies Config;
