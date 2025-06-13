/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#ffd31a",    // original yellow
          dark: "#ffc020",       // 25% toward orange
          darker: "#ffaa25",     // 50% toward orange
          darkest: "#ff981b",    // 75% toward orange
        },
        orange: {
          DEFAULT: "#ff8f1f",    // original orange
          dark: "#ff6f2f",       // 25% toward red
          darker: "#ff503f",     // 50% toward red
          darkest: "#ff394f",    // 75% toward red
        },
        red: {
          DEFAULT: "#ff2976",    // original red
          dark: "#f6419f",       // 25% toward pink
          darker: "#eb59c5",     // 50% toward pink
          darkest: "#e170e6",    // 75% toward pink
        },
        pink: {
          DEFAULT: "#f222fe",    // original pink
          dark: "#d34cfb",       // 25% toward purple
          darker: "#b365f8",     // 50% toward purple
          darkest: "#947dfa",    // 75% toward purple
        },
        purple: {
          DEFAULT: "#8d1eff",    // original purple
          dark: "#6a17c0",       // 25% toward dark purple
          darker: "#461091",     // 50%
          darkest: "#230a59",    // 75%
          // dark purple is final at 100% — "#120e27"
        }
      }
    },
  },
  plugins: [],
}

