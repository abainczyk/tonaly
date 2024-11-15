import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
