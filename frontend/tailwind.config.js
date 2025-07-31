/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal': {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
} 