/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'hyundai': '#002c5f',
        'secondary':'#666666',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: "light",
   },
}

