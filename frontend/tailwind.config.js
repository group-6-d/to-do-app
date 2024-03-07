/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      height: theme => ({
        "screen/80": "80vh",
      }),
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
