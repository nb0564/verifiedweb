/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verified-green': {
          light: '#00FF9D',
          DEFAULT: '#00CC7E',
          dark: '#008F58',
        },
        'matrix-black': '#000000',
        'neon-yellow': '#FFD700',
      },
      fontFamily: {
        'mono': ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 157, 0.5)',
        'neon-strong': '0 0 20px rgba(0, 255, 157, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

