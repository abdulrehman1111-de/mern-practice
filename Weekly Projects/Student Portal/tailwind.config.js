/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d1117",
        panel: "#141b24",
        panel2: "#10161f",
        border: "#232c38",
        text: "#e9edf2",
        dim: "#8b97a7",
        accent: "#6ee7b7",
        accent2: "#7aa2f7",
        danger: "#f28b82",
        warn: "#f2b555",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        field: "9px",
      },
    },
  },
  plugins: [],
};