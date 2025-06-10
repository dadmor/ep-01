// const { themes } = require('daisyui/src/colors/themes');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [light, dark],
    defaultTheme: "light",
  },
};
