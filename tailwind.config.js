/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#111827",
        brand: {
          cyan: "#22d3ee",
          purple: "#a78bfa",
          green: "#34d399",
          pink: "#f472b6",
          yellow: "#fbbf24"
        }
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(167,139,250,0.25), 0 0 30px rgba(34,211,238,0.15)",
      }
    },
  },
  plugins: [],
}
