import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#07265D",
          bronze: "#C69C6D",
          offwhite: "#F6F7F8",
          body: "#1D1D1D"
        }
      },
      fontFamily: {
        heading: ["Gilda Display", "serif"],
        body: ["Gilda Display", "serif"]
      },
      boxShadow: {
        card: "0 8px 24px rgba(7, 38, 93, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
