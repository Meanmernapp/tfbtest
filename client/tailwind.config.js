/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      screens: {
        xss: "320px",
        xsm: "460px",
        smd: "600px",
      },
    },
  },
  plugins: [],
};
