const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    },
    colors: {
      'color-primary': '#e63946',
      'color-secondary': '#d5bdaf',
      'third-color': '#003049',
      'fourth-color': '#ffd400',
      'fifth-color':'#000000',
      'sixth-color':'#ffffff',
      'gray': '#808080',
      'link-color': '#0000ff',
      'salon': '#FF0000',        // Couleur pour Salon
      'collection': '#00FF00',   // Couleur pour Collection
      'fouille': '#0000FF',      // Couleur pour Fouille
      'gisement': '#FFFF00',

    },
    fontFamily:{
      'sans': ['Helvetica'],

    },
    extend: {
      fontSize: {
        xs: '12px',
        '2xs': '10px'
      },
      keyframes: {
        blink: {
          '0%': {
            opacity: '0.2'
          },
          '20%': {
            opacity: '1'
          },
          '100%': {
            opacity: ' 0.2'
          }
        }
      },
      animation: {
        blink: 'blink 1.4s infinite both'
      }
    }
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': value => {
            return {
              'animation-delay': value
            }
          }
        },
        {
          values: theme('transitionDelay')
        }
      )
    })
  ],
  daisyui: {
    themes: ["light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",],
  },
}
