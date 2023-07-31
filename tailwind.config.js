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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'dark': {
        DEFAULT: '#5B5B5B',
        text: '#ffffff',
        border: '#8F8F8F',
        hover: '#ffffff',
        100: {
          DEFAULT: '#C5C5C5',
          text: '#ffffff',
          hover: '#ffffff',
        },
        300: {
          DEFAULT: '#8F8F8F',
          text: '#ffffff',
          hover: '#ffffff',
        },
        700: {
          DEFAULT: '#242424',
          text: '#ffffff',
          hover: '#ffffff',
        },
        900: {
          DEFAULT: '#121212',
          text: '#ffffff'
        },
      },
      'light': {
        DEFAULT: '#F3F3F3',
        text: '#121212',
        100: {
          DEFAULT: '#FFFFFF',
          text: '#121212'
        },
        300: {
          DEFAULT: '#FAFAFA',
          text: '#121212',
          border: '#EBEBEB',
        },
        700: {
          DEFAULT: '#EBEBEB',
          text: '#121212'
        },
        900: {
          DEFAULT: '#DBDBDB',
          text: '#121212'
        },
      },
      'disabled': {
        DEFAULT: '#8F8F8F',
        text: '#5B5B5B',
        100: {
          DEFAULT: '#8F8F8F',
          text: '#5B5B5B'
        },
        300: {
          DEFAULT: '#8F8F8F',
          text: '#5B5B5B'
        },
        700: {
          DEFAULT: '#8F8F8F',
          text: '#5B5B5B'
        },
        900: {
          DEFAULT: '#8F8F8F',
          text: '#5B5B5B'
        },
      },
      'secondary': {
        DEFAULT: '#00D4FF',
        text: '#ffffff',
        100: {
          DEFAULT: '#AAF0FF',
          text: '#121212'
        },
        300: {
          DEFAULT: '#55E2FF',
          text: '#ffffff'
        },
        700: {
          DEFAULT: '#008DAA',
          text: '#ffffff'
        },
        900: {
          DEFAULT: '#004655',
          text: '#ffffff'
        },
      },
      'primary': {
        DEFAULT: '#07C9CA',
        text: '#ffffff',
        100: {
          DEFAULT: '#ACEDED',
          text: '#121212'
        },
        300: {
          DEFAULT: '#59DBDB',
          text: '#ffffff'
        },
        700: {
          DEFAULT: '#048686',
          text: '#ffffff'
        },
        900: {
          DEFAULT: '#024343',
          text: '#ffffff'
        },
      },
      'success': {
        DEFAULT: '#0EDD9A',
        text: '#ffffff',
        100: {
          DEFAULT: '#AEF3DD',
          text: '#121212'
        },
        300: {
          DEFAULT: '#5EE8BB',
          text: '#ffffff'
        },
        700: {
          DEFAULT: '#099366',
          text: '#ffffff'
        },
        900: {
          DEFAULT: '#044933',
          text: '#ffffff'
        },
      },
      'danger': {
        DEFAULT: '#F14444',
        text: '#ffffff',
        100: {
          DEFAULT: '#FAC0C0',
          text: '#121212'
        },
        300: {
          DEFAULT: '#F58282',
          text: '#121212'
        },
        700: {
          DEFAULT: '#A02D2D',
          text: '#ffffff'
        },
        900: {
          DEFAULT: '#501616',
          text: '#ffffff'
        },
      },
      'warning': {
        DEFAULT: '#FFEB3C',
        text: '#353535',
        100: {
          DEFAULT: '#FFF8BE',
          text: '#353535'
        },
        300: {
          DEFAULT: '#FFF17D',
          text: '#000000'
        },
        700: {
          DEFAULT: '#AA9C28',
          text: '#ffffff'
        },
        900: {
          DEFAULT: '#554E14',
          text: '#ffffff'
        },
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    backgroundImage: {
      login: "url('https://source.unsplash.com/featured')" //"url('/logo_bg_transp_light.png')",
    }
  },
  plugins: [require('tailwindcss-animate')],
  safelist: [
    {
      // Temas Custom: 100|300|700|900
      pattern: /(bg|text|border)-(dark|light|secondary|primary|success|danger|warning|disabled|red|pink|purple|indigo|blue|light-blue|cyan|teal|emerald|green|lime|yellow|amber|orange|red|rose)(|-(100|200|300|400|500|600|700|800|900)|text|hover)(|text|hover)/,
    }
  ]
};
