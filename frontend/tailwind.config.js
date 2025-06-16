/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Tomorrow', 'sans-serif'],
        sans: ['Raleway', 'sans-serif'],
      },
      colors: {
        purple: {
          DEFAULT: "#7901ff",   // Vivid purple
          light: "#d58aff",     // Soft lilac
          dark: "#31006d",      // Deep violet
        },
        gray: {
          100: "#fefefe",
          150: "#e5e6e7",
          200: "#cbcccf",
          250: "#b2b4b7",
          300: "#a3a7aa",
          350: "#94989c",
          400: "#9a9fa3",
          450: "#8c9094",
          500: "#7e8184",
          550: "#727578",
          600: "#66696c",
          650: "#5f6164",
          700: "#5e5c5d",
          750: "#4b494a",
          800: "#393736",
          850: "#252423",
          875: "#131313",
          900: "#0c0c0c",
        },
      },
      backgroundImage: {
        'grid-glow': `
          linear-gradient(to right, rgba(49, 0, 109,0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(49, 0, 109,0.5) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-glow': '20px 20px',
      },
      animation: {
        'grid-glow': 'pulseGlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

