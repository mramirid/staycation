/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        "14px": "0.875rem",
        "50px": "3.125rem",
        "70px": "4.375rem",
        "100px": "6.25rem",
      },
      spacing: {
        "1px": "0.063rem",
        "10px": "0.625rem",
        "30px": "1.875rem",
        "45px": "2.813rem",
        "50px": "3.125rem",
        "180px": "11.25rem",
      },
      minHeight: {
        "45px": "2.813rem",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3252DF",
          "primary-content": "#FFFFFF",
          secondary: "#152C5B",
          accent: "#FF498B",
          neutral: "#000000",
          "base-100": "#FFFFFF",
          "base-200": "#E5E5E5",
          "base-300": "#B0B0B0",
          success: "#1ABC9C",
          "success-content": "#FFFFFF",
          warning: "#FFCC47",
          error: "#E74C3C",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
