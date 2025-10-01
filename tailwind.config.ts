import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ibm-plex-arabic)", "sans-serif"],
      },
      boxShadow: {
        "tw-shadow":
          "0 1px 1px 0.5px rgba(41,41,41,.04), 0 3px 3px -1.5px rgba(41,41,41,.02), 0 6px 6px -3px rgba(41,41,41,.04), 0 12px 12px -6px rgba(41,41,41,.04), 0 24px 24px -12px rgba(41,41,41,.04), 0 48px 48px -24px rgba(41,41,41,.04), 0 0 0 1px rgba(41,41,41,.04), inset 0 -1px 1px -0.5px rgba(51,51,51,.06)",
        "real-shadow":
          "0 0 0 1px rgba(227, 225, 222, 0.4), 0 1px 2px rgba(95, 74, 46, 0.08), 0 4px 6px rgba(95, 74, 46, 0.04), 0 40px 40px -24px rgba(104, 75, 37, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
