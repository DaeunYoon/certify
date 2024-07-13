/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './formkit.theme.ts',
  ],
  theme: {
    extend: {
      primary: {
        DEFAULT: '#1E3A8A',
        50: '#DBE2F7',
        100: '#C0CDF1',
        200: '#89A1E5',
        300: '#5376DA',
        400: '#2A51C0',
        500: '#1E3A8A',
        600: '#1A3379',
        700: '#172C68',
        800: '#132558',
        900: '#0F1E47',
        950: '#0E1A3F',
      },
      accent: '#60A5FA',
      text: '#525252',
    },
    borderRadius: {
      DEFAULT: '0.4rem',
    },
    fontFamily: {
      serpentine: ['Serpentine', 'ui-serif'],
    },
  },
  plugins: [],
};
