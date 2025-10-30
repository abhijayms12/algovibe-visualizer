/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["Poppins", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        background: "#0b1020",
        surface: "#0f1425",
        brand: {
          cyan: "#22d3ee",
          purple: "#a78bfa",
          green: "#34d399",
          pink: "#f472b6",
          yellow: "#facc15",
          blue: "#60a5fa",
          orange: "#fb923c"
        }
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(167,139,250,0.25), 0 0 30px rgba(34,211,238,0.15)",
        neon: "0 10px 30px rgba(96,165,250,0.2), 0 0 60px rgba(34,211,238,0.15)",
      }
    },
  },
  plugins: [],
}
