/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3743D',
        grey: '#939393',
        overlay: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
