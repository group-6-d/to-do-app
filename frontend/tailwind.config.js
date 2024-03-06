/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/typography'],
  preflight: {
    reset: {
      margin: true,
      padding: true,
    },
  },
};
