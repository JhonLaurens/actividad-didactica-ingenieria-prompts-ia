/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'primary': {
              light: '#60a5fa', // blue-400
              DEFAULT: '#3b82f6', // blue-500
              dark: '#2563eb', // blue-600
            },
            'secondary': {
              light: '#fde047', // yellow-300
              DEFAULT: '#facc15', // yellow-400
              dark: '#eab308', // yellow-500
            },
            'neutral': {
              light: '#f3f4f6', // gray-100
              DEFAULT: '#d1d5db', // gray-300
              dark: '#1f2937', // gray-800 (was gray-700)
              darker: '#111827', // gray-900 (was gray-800)
            }
          }
    },
  },
  plugins: [],
}