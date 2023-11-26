/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/main.ts"],
  theme: {
    extend: {
      colors: {
        'background-color': '#F7EFE5',
        'accent-color-1': '#E5D9B6',
        'accent-color-2': '#A4BE7B',
        'btn-color': '#5F8D4E',
        'btn-color-off': '#285430',
      },
    },
  },
  plugins: [],
}

