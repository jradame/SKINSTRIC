// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      keyframes: {
        proceedSlideIn: {
          "0%": { transform: "translateX(-25%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        proceedSlideIn: "proceedSlideIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};









