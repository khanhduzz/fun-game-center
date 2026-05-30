// tailwind.config.js snippet adjustment
module.exports = {
  theme: {
    extend: {
      animation: {
        "bounce-short": "bounceShort 1s ease-in-out infinite",
      },
      keyframes: {
        bounceShort: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
};
