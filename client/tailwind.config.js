module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#F0F2F8",
          300: "#94B0E6",
          450: "#1ea7fd",
        },
        orange: {
          200: "#FFF4EB",
          300: "#FFCEBC",
          500: "#E89C80",
          600: "#D88364",
        },
        black: {
          100: "#B1B1B1",
          400: "#434343",
        },
        gray: {
          300: "#cdd4d8",
          700: "#4B4D5C",
        },
      },
      height: {
        "70px": "70px",
        "450px": "450px",
      },
      width: {
        "620px": "620px",
      },
      gridTemplateColumns: {
        chat: "80px 240px auto",
      },
    },
    fontFamily: {
      sans: [
        "Arial",
        "Nunito Sans",
        "Helvetica Neue",
        "Helvetica",
        "sans-serif",
      ],
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset",
    },
    minWidth: {
      8: "2rem",
      10: "2.5rem",
      14: "3.5rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
