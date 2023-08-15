
/** @type {import('tailwindcss').Config} */
export default
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
  },
  plugins:[
    require("@tailwindcss/line-clamp")
  ]
};
