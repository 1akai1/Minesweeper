/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        handjet: ['Handjet', 'cursive'],
        roboto: ['Roboto Condensed', 'sans-serif']
      },
      colors: {
        myGreen: { 100: '#97f08f', 200: '#87e06f' }
      }
    }
  },
  plugins: []
}
