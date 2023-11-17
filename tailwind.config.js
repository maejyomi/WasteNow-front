/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        'now-blue' : '#5B8DFF',
      },
      fontFamily : {
        sans : ["Nanum Gothic", "sans-serif"]
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

