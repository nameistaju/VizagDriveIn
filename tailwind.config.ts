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
        charcoal: "#14110f",
        cream: "#f3e9dc",
        amber: "#E00902", // Replaced orange with red #E00902
        chili: "#E00902",
        teal: "#2ee6c8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        "glow-amber": "0 0 35px -8px rgba(224, 9, 2, 0.4)",
        "glow-chili": "0 0 35px -8px rgba(224, 9, 2, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
