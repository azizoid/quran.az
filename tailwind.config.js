module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
