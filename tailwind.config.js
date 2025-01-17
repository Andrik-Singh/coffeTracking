/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/images/coffeBackground.jpg')",
      },
      fontSize:{
        '5':'50px',
        '3.5':'33px'
      },
      fontFamily:{
        'Fredoka':'"Fredoka", serif',
        'Merriweather':' "Merriweather", serif'
      }
    },
  },
  plugins: [],
}