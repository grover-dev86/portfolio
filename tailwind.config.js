/** @type {import('tailwindcss').Config} */
// updated shadows
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          // 50 is a CSS variable so it flips to a dark surface in dark mode
          50: "rgb(var(--c-brand-50) / <alpha-value>)",
          100: "#c4eefa",
          200: "#8edef4",
          300: "#4ecbec",
          400: "#21bce5",
          500: "#1bb0db",
          600: "#1894ba",
          700: "#147694",
          800: "#125e77",
          900: "#0e4a5e",
        },
        // ink text colors are CSS variables so they flip automatically per theme
        ink: {
          900: "rgb(var(--c-ink-900) / <alpha-value>)",
          700: "rgb(var(--c-ink-700) / <alpha-value>)",
          500: "rgb(var(--c-ink-500) / <alpha-value>)",
          300: "rgb(var(--c-ink-300) / <alpha-value>)",
        },
        canvas: "#f4f6f8",
        // Dark-mode surfaces
        night: {
          bg: "#0b0e12",
          card: "#151b23",
          soft: "#1c232d",
          border: "#2a3340",
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Even shadow around all sides + soft drop below
        card: "0 0 60px -10px rgba(15, 23, 42, 0.18), 0 0 30px -5px rgba(15, 23, 42, 0.12), 0 25px 50px -15px rgba(15, 23, 42, 0.20)",
        rail: "0 0 25px -5px rgba(15, 23, 42, 0.15), 0 10px 25px -10px rgba(15, 23, 42, 0.18)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        growBar: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width, 100%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        "fade-in": "fadeIn 0.4s ease-out both",
        "slide-in-right": "slideInRight 0.35s ease-out both",
        "grow-bar": "growBar 1s ease-out both",
      },
    },
  },
  plugins: [],
};
