import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans], // Default font across the project
        display: ["Poppins", "Arial", "sans-serif"], // Specific use-case font
      },
    },
  },
  plugins: [],
} satisfies Config;
