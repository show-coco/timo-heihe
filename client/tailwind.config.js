module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          450: "#1ea7fd",
        },
        orange: {
          200: "#FFF4EB",
          500: "#E89C80",
          600: "#D88364",
        },
        black: {
          400: "#434343",
        },
      },
      height: {
        "450px": "450px",
      },
      width: {
        "620px": "620px",
      },
    },
    fontFamily: {
      sans: [
        "Nunito Sans",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    boxShadow: {
      inner: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
