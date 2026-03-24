/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D5A27",    // 森林綠
        secondary: "#E6D5C3",  // 溫暖的大地色
        accent: "#FF7043",     // 活潑的橘子色
        muted: "#F5F5F5",
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
