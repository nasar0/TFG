/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        animation: {
          typewriter: "typewriter 2s steps(20) forwards",
          caret: "typewriter 2s steps(20) forwards, blinkCursor 0.7s infinite",
        },
        keyframes: {
          typewriter: {
            from: { width: "0" },
            to: { width: "100%" },
          },
          blinkCursor: {
            from: { "border-right-color": "rgba(0, 0, 0, 0.75)" },
            to: { "border-right-color": "transparent" },
          },
        },
      },
    },
    plugins: [],
  }