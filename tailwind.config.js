/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // Scans all your files for Tailwind classes
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F5F2E9',
        charcoal: '#4A4A4A',
        teal: '#4A9A8F',
        coral: '#FF6F61',
        sage: '#A8C4A0',
        emerald: '#059669',  // For headers/buttons
      },
    },
  },
  plugins: [],
};