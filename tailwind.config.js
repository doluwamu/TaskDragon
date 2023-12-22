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
      },
      backgroundImage: {
        banner:
          'linear-gradient(120deg, rgb(0, 30, 99) 25%, rgb(0, 30, 99) 45%, rgb(0, 23, 52) 5%, rgb(0, 23, 52) 25%)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('flowbite/plugin')],
  content: ['./node_modules/flowbite/**/*.ts']
}
