/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#F5F2E9",
        charcoal: "#4A4A4A",
        coral: "#FF6F61",
        sage: "#A8C4A0",
        emerald: {
          500: "#10b981",
          600: "#059669",   // main button/header
          700: "#047857",   // hover
          800: "#065f46",
        },
      },
    },
  },
  plugins: [],
};