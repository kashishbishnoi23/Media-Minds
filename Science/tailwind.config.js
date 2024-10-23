/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        footer_bg: '#333131'
      },
      keyframes: {

        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
          },


          '100%': {
            transform: 'translateX(0%)',
          }
        }
        ,
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          }
        }
      },
      animation: {
        slideInLeft: 'slideInLeft 1s ease-out forwards',
        slideInRight1: 'slideInRight 1s ease-out 1.2s forwards',
        slideInRight2: 'slideInRight 1s ease-out 1.4s forwards',
        slideInRight3: 'slideInRight 1s ease-out 1.6s forwards',
        slideInRight4: 'slideInRight 1s ease-out 1.8s forwards',
        slideInRight5: 'slideInRight 1s ease-out 2s forwards',
      },
    },
  },
  plugins: [],
}

