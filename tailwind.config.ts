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
        cream: "#F5F0E8", // Sandy Linen (#F5F0E8)
        sandy: "#F5F0E8",
        "sandy-linen": "#F5F0E8",
        scarlet: "#D91A2A", // Scarlet Bikini (#D91A2A)
        "scarlet-bikini": "#D91A2A",
        aegean: "#1A6FBF", // Aegean Sky (#1A6FBF)
        "aegean-sky": "#1A6FBF",
        amber: "#D91A2A",
        chili: "#D91A2A",
        teal: "#1A6FBF",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        bakso: ["var(--font-bakso)", "cursive", "sans-serif"],
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
