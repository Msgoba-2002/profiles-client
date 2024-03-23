/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "oba-blue": "#1E3A8A",
        "oba-red": "#9F1239",
        "oba-gray": "#E7E5E4",
        "oba-white": "#FCFCFC",
        "oba-black": "#333333"
      },
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}

