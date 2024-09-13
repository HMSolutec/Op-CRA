/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "leave-day": "rgb(var(--leave-day))",
        "leave-day-transparent": "rgb(var(--leave-day-transparent))",
        tooltip: "rgb(var(--tooltip))",
        border: "rgb(var(--border))",
        overlay: "rgb(var(--overlay))",
      },
    },
  },
  plugins: [],
};
