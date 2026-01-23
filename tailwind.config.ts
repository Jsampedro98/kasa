import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-red': '#99331A',
        'dark-orange': '#842C16',
        'light-orange': '#FFFBF9',
        'noir': '#0D0D0D',
        'blanc': '#FFFFFF',
        'gris-light': '#F5F5F5',
        'gris-dark': '#565656',

        primary: '#99331A',
        background: '#FFFFFF',
        foreground: '#0D0D0D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '20px',
        screens: {
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
};
export default config;
