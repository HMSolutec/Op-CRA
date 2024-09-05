/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        "grow": {
          "0%": {
            transform: "scaleX(0%)",
          },
          "100%": {
            transform: "scaleX(100%)"
          }
        }
      },
      animation: {
        "grow": "grow 2s forwards"
      }
    },
  },
  plugins: [],
};
