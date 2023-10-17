/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      xsm: '479.99px',
      sm: '480px',
      md: '768px',
      lg: '1000px',
      xl: '1440px'
    },
    extend: {
      colors: {
        main: 'rgb(0, 2, 22)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('flowbite/plugin')],
  content: ['./node_modules/flowbite/**/*.ts']
}
