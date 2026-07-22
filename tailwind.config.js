export default {
  darkMode: "class",
}
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // ← ADD THIS LINE
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}