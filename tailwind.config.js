/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      // Include additional paths if you have components elsewhere
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        // You can list preset themes or your custom themes here:
        "light",
        "dark",
        {
          mytheme: {
            primary: "#a991f7",
            secondary: "#f6d860",
            accent: "#37cdbe",
            neutral: "#3d4451",
            "base-100": "#ffffff",
            // ...add additional tokens if needed
          },
        },
        "cupcake",
      ],
    },
  };
  