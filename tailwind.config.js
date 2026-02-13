/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ghibliSky: {
          50: "#f4f7fb",
          100: "#e3eff8",
          200: "#c4dcef",
          300: "#a0c5e2",
          400: "#7aa9d1",
          500: "#5b8fbf",
          600: "#46739f",
          700: "#375a7c",
          800: "#29425a",
          900: "#1c2c3b"
        },
        ghibliLeaf: {
          50: "#f3faf3",
          100: "#e0f3e2",
          200: "#bfe3c3",
          300: "#96ce9c",
          400: "#6db679",
          500: "#4d9960",
          600: "#3b7b4c",
          700: "#305f3d",
          800: "#254530",
          900: "#182b20"
        },
        ghibliBlush: {
          50: "#fff7f4",
          100: "#ffe7de",
          200: "#fbc9b7",
          300: "#f3a488",
          400: "#ea7a55",
          500: "#d55e39",
          600: "#af472b",
          700: "#843422",
          800: "#592119",
          900: "#34120f"
        },
        ghibliCream: "#fdf5e6",
        ghibliInk: "#1c2024"
      },
      fontFamily: {
        display: ["system-ui", "sans-serif"],
        handwriting: ["\"Comic Neue\"", "cursive"]
      },
      boxShadow: {
        "soft-card": "0 18px 45px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};

