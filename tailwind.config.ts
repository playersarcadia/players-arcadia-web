import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "#d4af37",
          light: "#e5c047",
          dark: "#b8941f",
        },
        navy: {
          DEFAULT: "#082C73",
          light: "#1a2342",
        },
      },
    },
  },
  plugins: [],
};
export default config;

