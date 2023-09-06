// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const toPX = values => Object.fromEntries(values.map(v => [+v, `${v}px`]))
const object0to100px = toPX(Array.from({ length: 101 }).map((_, i) => +i))

const fallbackSansSerifFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Helvetica',
  'Segoe UI',
  'Arial',
  'sans-serif'
]

const typography = {
  '.text-extrabold-64': {
    fontSize: '64px',
    fontWeight: 800
  },
  '.text-extrabold-52': {
    fontSize: '52px',
    fontWeight: 800
  },
  '.text-extrabold-48': {
    fontSize: '48px',
    fontWeight: 800
  },
  '.text-extrabold-36': {
    fontSize: '36px',
    fontWeight: 800
  },
  '.text-extrabold-32': {
    fontSize: '36px',
    fontWeight: 800
  },
  '.text-extrabold-28': {
    fontSize: '28px',
    fontWeight: 800
  },
  '.text-extrabold-24': {
    fontSize: '24px',
    fontWeight: 800
  },
  '.text-extrabold-20': {
    fontSize: '20px',
    fontWeight: 800
  },
  '.text-extrabold-18': {
    fontSize: '18px',
    fontWeight: 800
  },
  '.text-extrabold-16': {
    fontSize: '16px',
    fontWeight: 800
  },
  '.text-extrabold-10': {
    fontSize: '10px',
    fontWeight: 800
  },
  '.text-bold-24': {
    fontSize: '24px',
    fontWeight: 700
  },
  '.text-bold-22': {
    fontSize: '22px',
    fontWeight: 700
  },
  '.text-bold-18': {
    fontSize: '18px',
    fontWeight: 700
  },
  '.text-bold-16': {
    fontSize: '16px',
    fontWeight: 700
  },
  '.text-bold-14': {
    fontSize: '14px',
    fontWeight: 700
  },
  '.text-bold-12': {
    fontSize: '12px',
    fontWeight: 700
  },
  '.text-semibold-16': {
    fontSize: '16px',
    fontWeight: 600
  },
  '.text-semibold-14': {
    fontSize: '14px',
    fontWeight: 600
  },
  '.text-medium-22': {
    fontSize: '22px',
    fontWeight: 500
  },
  '.text-medium-20': {
    fontSize: '20px',
    fontWeight: 500
  },
  '.text-medium-16': {
    fontSize: '16px',
    fontWeight: 500
  },
  '.text-medium-14': {
    fontSize: '14px',
    fontWeight: 500
  },
  '.text-medium-12': {
    fontSize: '12px',
    fontWeight: 500
  },
  '.text-regular-22': {
    fontSize: '22px',
    fontWeight: 400
  },
  '.text-regular-20': {
    fontSize: '18px',
    fontWeight: 400
  },
  '.text-regular-18': {
    fontSize: '18px',
    fontWeight: 400
  },
  '.text-regular-16': {
    fontSize: '16px',
    fontWeight: 400
  },
  '.text-regular-12': {
    fontSize: '12px',
    fontWeight: 400
  }
}

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(typography)
    })
  ],

  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],

  corePlugins: {
    container: false
  },

  theme: {
    screens: {
      xl: { max: '1529.99px' },
      lg: { max: '1199.99px' },
      md: { max: '991.99px' },
      sm: { max: '767.99px' },
      xs: { max: '575.99px' }
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'transparent',
      current: 'currentColor',

      dark: '#3F3F47',
      yellow: '#ED7622',

      gray: '#EEEFEF',
      milky: '#F3F1EC',
      green: '#336F3F',
      pale: '#FFDD82',
      red: '#e35050',

      button: {
        DEFAULT: '#EEEFEF',
        dark: '#E2E3E3'
      },

      tapestry: '#fcf9ed'
    },

    spacing: object0to100px,

    fontFamily: {
      sans: ['Value Sans Pro', ...fallbackSansSerifFonts],
      inter: ['Inter', ...fallbackSansSerifFonts]
    }
  }
}
