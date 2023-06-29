/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './(pages)/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '936px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      '2xli': {'min': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xli': {'min': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lgi': {'min': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'mdi': {'min': '767px'},
      // => @media (max-width: 767px) { ... }

      'smi': {'min': '639px'},
      // => @media (max-width: 639px) { ... }
    },
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
      red: {
        DEFAULT: '#F87171',
        text: '#ffffff',
        100: {
          DEFAULT: '#FECACA',
          text: '#7F1D1D',
        },
        200: {
          DEFAULT: '#FCA5A5',
          text: '#7F1D1D',
        },
        300: {
          DEFAULT: '#F87171',
          text: '#7F1D1D',
        },
        400: {
          DEFAULT: '#EF4444',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#DC2626',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#B91C1C',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#991B1B',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#7F1D1D',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#501616',
          text: '#ffffff',
        },
      },
      pink: {
        DEFAULT: '#F472B6',
        text: '#ffffff',
        100: {
          DEFAULT: '#FEC8E8',
          text: '#7C1A70',
        },
        200: {
          DEFAULT: '#FBB6CE',
          text: '#7C1A70',
        },
        300: {
          DEFAULT: '#F472B6',
          text: '#7C1A70',
        },
        400: {
          DEFAULT: '#EC4899',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#DB2777',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#BE185D',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#9D174D',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#831843',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#63132D',
          text: '#ffffff',
        },
      },
      purple: {
        DEFAULT: '#C084FC',
        text: '#ffffff',
        100: {
          DEFAULT: '#EDE9FE',
          text: '#5521B5',
        },
        200: {
          DEFAULT: '#D4CAFF',
          text: '#5521B5',
        },
        300: {
          DEFAULT: '#B794F4',
          text: '#5521B5',
        },
        400: {
          DEFAULT: '#9F7AEA',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#805AD5',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#6B46C1',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#553C9A',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#44337A',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#322659',
          text: '#ffffff',
        },
      },
      indigo: {
        DEFAULT: '#A78BFA',
        text: '#ffffff',
        100: {
          DEFAULT: '#E0E7FF',
          text: '#4C51BF',
        },
        200: {
          DEFAULT: '#C7D2FE',
          text: '#4C51BF',
        },
        300: {
          DEFAULT: '#A78BFA',
          text: '#4C51BF',
        },
        400: {
          DEFAULT: '#8B5CF6',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#7C3AED',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#6D28D9',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#5B21B6',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#4C1D95',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#3C1A77',
          text: '#ffffff',
        },
      },
      blue: {
        DEFAULT: '#60A5FA',
        text: '#ffffff',
        100: {
          DEFAULT: '#DBEAFE',
          text: '#1E3A8A',
        },
        200: {
          DEFAULT: '#BFDBFE',
          text: '#1E3A8A',
        },
        300: {
          DEFAULT: '#60A5FA',
          text: '#1E3A8A',
        },
        400: {
          DEFAULT: '#3B82F6',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#2563EB',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#1D4ED8',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#1E40AF',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#1E3A8A',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#1C3A6E',
          text: '#ffffff',
        },
      },
      'light-blue': {
        DEFAULT: '#93C5FD',
        text: '#ffffff',
        100: {
          DEFAULT: '#EFF6FF',
          text: '#1864AB',
        },
        200: {
          DEFAULT: '#DBEAFE',
          text: '#1864AB',
        },
        300: {
          DEFAULT: '#93C5FD',
          text: '#1864AB',
        },
        400: {
          DEFAULT: '#60A5FA',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#3B82F6',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#2563EB',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#1D4ED8',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#1E40AF',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#1E3A8A',
          text: '#ffffff',
        },
      },
      cyan: {
        DEFAULT: '#6EE7B7',
        text: '#121212',
        100: {
          DEFAULT: '#D1FAE5',
          text: '#065F46',
        },
        200: {
          DEFAULT: '#A7F3D0',
          text: '#065F46',
        },
        300: {
          DEFAULT: '#6EE7B7',
          text: '#065F46',
        },
        400: {
          DEFAULT: '#34D399',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#10B981',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#059669',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#047857',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#065F46',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#064E3B',
          text: '#ffffff',
        },
      },
      teal: {
        DEFAULT: '#14B8A6',
        text: '#121212',
        100: {
          DEFAULT: '#CCFBF1',
          text: '#065F46',
        },
        200: {
          DEFAULT: '#99F6E4',
          text: '#065F46',
        },
        300: {
          DEFAULT: '#5EEAD4',
          text: '#065F46',
        },
        400: {
          DEFAULT: '#2DD4BF',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#14B8A6',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#0D9488',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#0F766E',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#115E59',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#134E4A',
          text: '#ffffff',
        },
      },
      emerald: {
        DEFAULT: '#10B981',
        text: '#121212',
        100: {
          DEFAULT: '#D1FAE5',
          text: '#065F46',
        },
        200: {
          DEFAULT: '#A7F3D0',
          text: '#065F46',
        },
        300: {
          DEFAULT: '#6EE7B7',
          text: '#065F46',
        },
        400: {
          DEFAULT: '#34D399',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#10B981',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#059669',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#047857',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#065F46',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#064E3B',
          text: '#ffffff',
        },
      },
      green: {
        DEFAULT: '#22C55E',
        text: '#ffffff',
        100: {
          DEFAULT: '#D1FAE5',
          text: '#064E3B',
        },
        200: {
          DEFAULT: '#A7F3D0',
          text: '#064E3B',
        },
        300: {
          DEFAULT: '#6EE7B7',
          text: '#064E3B',
        },
        400: {
          DEFAULT: '#34D399',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#22C55E',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#16A34A',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#15803D',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#166534',
          text: '#ffffff',
        },
         900: {
          DEFAULT: '#14532D',
          text: '#ffffff',
        },
      },
      lime: {
        DEFAULT: '#84CC16',
        text: '#121212',
        100: {
          DEFAULT: '#F0FEC3',
          text: '#54791B',
        },
        200: {
          DEFAULT: '#E6FFA8',
          text: '#54791B',
        },
        300: {
          DEFAULT: '#C6F6B4',
          text: '#54791B',
        },
        400: {
          DEFAULT: '#A3E635',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#84CC16',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#65A30D',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#4D7C0F',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#3F6212',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#365314',
          text: '#ffffff',
        },
      },
      yellow: {
        DEFAULT: '#FACC15',
        text: '#121212',
        100: {
          DEFAULT: '#FEF3C7',
          text: '#7C4D1A',
        },
        200: {
          DEFAULT: '#FDE68A',
          text: '#7C4D1A',
        },
        300: {
          DEFAULT: '#FCD34D',
          text: '#7C4D1A',
        },
        400: {
          DEFAULT: '#FBBF24',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#FACC15',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#EAB308',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#CA8A04',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#A16207',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#854D0E',
          text: '#ffffff',
        },
      },
      amber: {
        DEFAULT: '#F59E0B',
        text: '#121212',
        100: {
          DEFAULT: '#FEF3C7',
          text: '#7C4D1A',
        },
        200: {
          DEFAULT: '#FDE68A',
          text: '#7C4D1A',
        },
        300: {
          DEFAULT: '#FCD34D',
          text: '#7C4D1A',
        },
        400: {
          DEFAULT: '#FBBF24',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#F59E0B',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#D97706',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#B45309',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#92400E',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#78350F',
          text: '#ffffff',
        },
      },
      orange: {
        DEFAULT: '#F97316',
        text: '#121212',
        100: {
          DEFAULT: '#FEF2D7',
          text: '#7C3417',
        },
        200: {
          DEFAULT: '#FBD38D',
          text: '#7C3417',
        },
        300: {
          DEFAULT: '#F97316',
          text: '#7C3417',
        },
        400: {
          DEFAULT: '#EA580C',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#D9480F',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#A53E09',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#92400E',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#78350F',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#5E2B10',
          text: '#ffffff',
        },
      },
      rose: {
        DEFAULT: '#F43F5E',
        text: '#ffffff',
        100: {
          DEFAULT: '#FECDD3',
          text: '#7C1D23',
        },
        200: {
          DEFAULT: '#FCA5B7',
          text: '#7C1D23',
        },
        300: {
          DEFAULT: '#F43F5E',
          text: '#7C1D23',
        },
        400: {
          DEFAULT: '#E11D48',
          text: '#ffffff',
        },
        500: {
          DEFAULT: '#BE123C',
          text: '#ffffff',
        },
        600: {
          DEFAULT: '#9F1239',
          text: '#ffffff',
        },
        700: {
          DEFAULT: '#881337',
          text: '#ffffff',
        },
        800: {
          DEFAULT: '#731126',
          text: '#ffffff',
        },
        900: {
          DEFAULT: '#610D21',
          text: '#ffffff',
        },
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        login: "url('https://source.unsplash.com/featured')" //"url('/logo_bg_transp_light.png')",
      }
    },
  },
  plugins: [],
  safelist: [
    {
                                                                                                                                                                                              //100|300|700|900
      pattern: /(bg|text|border)-(dark|light|secondary|primary|success|danger|warning|disabled|red|pink|purple|indigo|blue|light-blue|cyan|teal|emerald|green|lime|yellow|amber|orange|red|rose)(|-(100|200|300|400|500|600|700|800|900)|text|hover)(|text|hover)/,
    }
  ]
};
