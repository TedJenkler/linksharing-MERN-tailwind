/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkgrey: "#333333",
        grey: "#737373",
        borders: "#D9D9D9",
        purple: "#633CFF",
        lightgrey: "#FAFAFA",
        white: "#FFFFFF"
      },
      backgroundImage: {
        'iconemail': "url('/src/assets/iconmail.png')",
        'iconpass': "url('/src/assets/iconpassword.png')",
      },
    },
  },
  plugins: [],
}
