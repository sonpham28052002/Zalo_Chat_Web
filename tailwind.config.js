/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        ProtestGuerrilla: ["font-ProtestGuerrilla"],
        SedgwickAveDisplay: ["font-SedgwickAveDisplay"],
        BarettStreet: ["font-BarettStreet"],
      },
    },
  },
  plugins: [],
};
