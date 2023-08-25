const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.{js,ts}'
  ],
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '14px' },
      })
    }),
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#FEF0E9',
          100: '#FDE0CF',
          200: '#FBCFB8',
          300: '#F9C0A1',
          400: '#F8B18C',
          500: '#F59766',
          600: '#FF6C26',
          700: '#E97035',
          800: '#DF6128',
          900: '#CB531E',
        },
        grey: {
          200: '#f1eae8',
        },
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['montserrat', ...defaultTheme.fontFamily.sans],
        display: ['montserrat', ...defaultTheme.fontFamily.sans],
        title: ['Orbitron', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '2xl': '40rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        activeblue: '#225271',
        darkblue: '#023148',
        darkerblue: '#081D2E',
        light: {
          100: '#f2f3f9',
          200: '#dbe8ea',
          600: '#97A2B6',
          800: '#878992',
        },
        dark: '#020618',
        degenOrange: '#ff6c26',
        rusty: '#d64900',
        broccoli: '#00705a',
        techGreen: '#0f978e',
        persianGreen: '#00ac8c',
        seafoamGreen: '#78cc97',

        error: '#ff264d',
        success: '#00ac8c',
        yellow: '#ffd926',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
