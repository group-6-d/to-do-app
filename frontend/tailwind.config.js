/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Outfit', 'sans-serif'],
        // serif: ['Roboto','sans-serif'],
      },
      letterSpacing: {
        tight: '-0.08rem',
        normal: '0',
        wide: '0.1em',
      },
      colors: {
        black: '#272727',
        red: '#e24848',
        grey: '#dae5e8',
      },
    },
  },
  plugins: [],
  preflight: {
    reset: {
      margin: true,
      padding: true,
    },
  },
};
