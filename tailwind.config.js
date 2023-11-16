/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        'now-blue' : '#5B8DFF',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

