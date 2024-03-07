/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Outfit', 'sans-serif'],
      },
      colors: {
        accent: '#2563eb',
        accentDark: '#1e40af',
        orrange: '#fe7456',
        yellow: '#fed24f',
        purple: '#8378ff',
        coral: '#fe6268',
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      height: (theme) => ({
        'screen/80': '80vh',
      }),
      maxHeight: {
        'scroll-vh': 'calc(80vh - 1rem)',
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
