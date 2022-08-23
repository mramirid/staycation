/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      grayE5: "#E5E5E5",
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
          success: "#1ABC9C",
          warning: "#FFCC47",
          error: "#E74C3C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
