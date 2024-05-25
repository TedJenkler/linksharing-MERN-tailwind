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
        white: "#FFFFFF",
        red: "#EE3939",
        blue: "#2D68FF",
        wine: "#8A1A50",
        darkpurple: "#302267"
      },
      backgroundImage: {
        'iconemail': "url('/src/assets/iconmail.png')",
        'iconpass': "url('/src/assets/iconpassword.png')",
      },
    },
  },
  plugins: [],
}
