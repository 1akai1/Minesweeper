/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
