/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00127F',
        'secondary': '#2C4FD1',
        'alice_blue': '#F2F3FB',
        'cosmic_latte': '#FFF8E2',
        'aero_blue': '#DAFBE4',
        'lavender_blush': '#FFF0F1',
        'glaucous': '#6A73B6',
      }
    },
  },
  plugins: [],
}