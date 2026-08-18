/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A41',
        gold: '#B8863B',
        cream: '#F7F3EA',
        charcoal: '#2A2A2A',
        maroon: '#6B2C2C',
        sage: '#8A9A8C',
        clay: '#C97F5B',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}