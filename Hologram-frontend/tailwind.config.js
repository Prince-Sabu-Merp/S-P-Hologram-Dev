/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "-15px 50px 32px rgba(0,0,0,0.25)",
      },
      colors: {
        deepSeaBlue: "#2D13EA",
        goldenMountain: "#FF7800",
      },
    },
  },
  plugins: [],
};
