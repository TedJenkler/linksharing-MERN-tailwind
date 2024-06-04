/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 32px rgba(0.39, 0.24, 1, 0.25)',
      },
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
        darkpurple: "#302267",
        hoverpurple: "#BEADFF",
        lightpurple: "#EFEBFF",
        twitter: "#43B7E9",
        facebook: "#2442AC",
        twitch: "#EE3FC8",
        gitlab: "#EB4925",
        hashnode: "#0330D1",
        overflow: "#EC7100",
      },
      backgroundImage: {
        'iconemail': "url('/src/assets/iconmail.png')",
        'iconpass': "url('/src/assets/iconpassword.png')",
        'frame': "url('/src/assets/frame.png')",
        'link': "url('/src/assets/linkbg.png')"
      },
      fontFamily: {
        sans: ['Instrument Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
    },
  },
  plugins: [],
}

