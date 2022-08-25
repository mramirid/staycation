/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        "70px": "4.375rem",
      },
      spacing: {
        "30px": "1.875rem",
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
          warning: "#FFCC47",
          error: "#E74C3C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
