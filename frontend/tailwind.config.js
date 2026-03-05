/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d4af37',
        secondary: '#dc143c',
        tertiary: '#228b22',
      },
      borderRadius: {
        'custom': '2rem',
      },
    },
  },
  plugins: [],
}

