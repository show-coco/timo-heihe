module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#F0F2F8",
          150: "#BAE3C7",
          300: "#94B0E6",
          350: "#356D86",
          450: "#1ea7fd",
          500: "#709BFA",
          550: "#536D8B",
          600: "#648BE0",
        },
        orange: {
          50: "#F7EEEA",
          200: "#FFF4EB",
          300: "#FFCEBC",
          350: "#E8C26B",
          400: "#FA9C89",
          primary: "#FA9C89",
          500: "#E89C80",
          600: "#D88364",
        },
        black: {
          100: "#B1B1B1",
          300: "#707070",
          400: "#434343",
        },
        gray: {
          300: "#cdd4d8",
          700: "#4B4D5C",
        },
        purple: {
          100: "#483586",
          150: "#F4E2FF",
          400: "#D484FF",
        },
        pink: {
          100: "#E3BABA",
        },
      },
      height: {
        "70px": "70px",
        "450px": "450px",
        "70vh": "70vh",
      },
      width: {
        "620px": "620px",
      },
      gridTemplateColumns: {
        chat: "80px 240px auto",
      },
      inset: {
        0.6: "0.6rem",
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
    minHeight: {
      pc: "calc(100vh - 5rem)",
      mobile: "calc(100vh - 3.5rem)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
