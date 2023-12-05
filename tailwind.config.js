/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        'now-blue' : '#5586f8',
      },
      fontFamily : {
        Jua : ["Jua", "sans-serif"],
        sans : ["Noto Sans KR", "sans-serif"]
      },
      
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

