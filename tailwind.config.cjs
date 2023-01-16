/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "10%": "10%",
      }
    },
    fontFamily: {
      archivo: ['Archivo', 'sans-serif']
    },
  },
  plugins: [],
}
