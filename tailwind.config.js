/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light Theme
        'primary': 'orangered',
        'background': '#FFFFFF',
        'text-primary': '#333',
        'text-secondary': '#555',
        'accent': '#ffd6d6',
        // Dark Theme
        'dark-primary': '#FF6347',
        'dark-background': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-text-primary': '#E0E0E0',
        'dark-text-secondary': '#B0B0B0',
        'dark-accent': '#2C1A17',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}