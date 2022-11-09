/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E232B',
        second: '#282f3a',
        primaryRed: '#E74C3C',
        red: '#FF0000'
      }
    },
  },
  plugins: [],
}
