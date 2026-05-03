/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        'yellow-crayola': 'hsl(45, 100%, 72%)'
      }
    }
  },
  plugins: [],
}