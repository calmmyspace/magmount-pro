/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        steel: { 50: '#f7f8f9', 100: '#edf0f3', 200: '#d8dee5', 300: '#b6c1cd', 400: '#8e9fb0', 500: '#708396', 600: '#5a6a7d', 700: '#4a5766', 800: '#3f4a56', 900: '#373f4a', 950: '#1a1f25' },
        accent: { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
      },
    },
  },
  plugins: [],
}
