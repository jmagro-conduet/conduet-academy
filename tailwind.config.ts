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
        lavender: "#CEA4FF",
        "lavender-dark": "#8B5CC8",
        "lavender-pale": "#F0E6FF",
        "off-white": "#F1F1F2",
        teal: "#008278",
        "teal-light": "#D6F0EE",
        coral: "#FF8C78",
        "coral-light": "#FFF0ED",
        amber: "#FFCC50",
        "amber-light": "#FFF8DC",
        dark: "#111111",
        "dark-card": "#1C1C1C",
        gray: "#6B6B6B",
        "gray-light": "#E4E4E5",
        "page-bg": "#F6F6F6",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
