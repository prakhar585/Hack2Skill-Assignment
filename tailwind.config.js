/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        screens: {
        'mobile': '640px',     // Mobile devices
        'tablet': '768px',     // Tablet devices
        'desktop': '1024px',   // Desktop devices
        'wide': '1280px',      // Wide screens
      },
    },
  },
  plugins: [],
}