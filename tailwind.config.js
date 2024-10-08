/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Warna-warna yang di-extend
      colors: {
        primary: "#f7ba34",
        secondary: "#69a79c",
        light: "#f7f7f7",
        dark: "#333333",
        dark2: "#999999",
      },
      // Shadow khusus
      boxShadow: {
        "custom-inset": "px 3px 4px rgba(0, 0, 0, 0.25), inset 2px 5px 6px rgba(255, 255, 255, 0.37), inset 0px -5px 6px rgba(0, 0, 0, 0.37)",
      },
      // Font custom
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // Pengaturan container
      container: {
        center: true,
        padding: {
          base: "1rem", // Ganti `default` dengan `base`
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  // Plugin custom
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".placeholder-text-3d::placeholder": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        },
      });
    },
  ],
};
