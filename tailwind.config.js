/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/(pages)/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  safelist: [
    {
      // Temas Custom: 100|300|700|900
      pattern: /(bg|text|border)-(dark|light|secondary|primary|success|danger|warning|disabled|red|pink|purple|indigo|blue|light-blue|cyan|teal|emerald|green|lime|yellow|amber|orange|red|rose)(|-(100|200|300|400|500|600|700|800|900)|text|hover)(|text|hover)/,
    }
  ]
};
