/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/main.ts"],
  themeConfig: {
    logo: '/logo.svg',
  },
  theme: {
    extend: {
      colors: {
        'background-color': '#F7EFE5',
        'accent-color-1': '#DDE6ED',
        'accent-color-2': '#9DB2BF',
        'btn-color': '#526D82',
        'btn-color-off': '#27374D',
      },
    },
  },
  plugins: [],
}