module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.{js,jsx}",
    "./sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      gridTemplateColumns: {
        seachPage: "300px auto",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
