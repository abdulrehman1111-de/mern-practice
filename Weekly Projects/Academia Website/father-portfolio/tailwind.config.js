/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
  extend: {
    colors: {
  navy: 'rgb(var(--color-navy) / <alpha-value>)',
  gold: 'rgb(var(--color-gold) / <alpha-value>)',
  cream: 'rgb(var(--color-cream) / <alpha-value>)',
  charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
  maroon: 'rgb(var(--color-maroon) / <alpha-value>)',
  sage: 'rgb(var(--color-sage) / <alpha-value>)',
  clay: 'rgb(var(--color-clay) / <alpha-value>)',
},
  },
},
  plugins: [],
}

