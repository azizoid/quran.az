module.exports = {
  content: [
    './pages/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './layouts/*.{jsx,tsx}',
    './ui/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
