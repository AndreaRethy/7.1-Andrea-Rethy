/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      body: ['Raleway', 'sans-serif'],
      heading: ['GFS Didot', 'serif']
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        'herobg': '#00496a60',
        'shadow': '#00496a33',
        transparent: 'transparent',
      },
      boxShadow: {
        'item': '2px 2px 3px 2px #00496a33',
      }
    },
  },
  plugins: [],
}