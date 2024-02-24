/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      rotate: {
        360: "360deg",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
