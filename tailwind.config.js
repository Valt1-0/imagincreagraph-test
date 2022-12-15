/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        'waves': 'waves 3s linear infinite',
      },
      keyframes: {
        waves: {
          '0%': { transform: 'translateX(50%) scaleX(1)' },
          '50%': { transform: 'translateX(100%) scaleX(2)' },
          '100%': { transform: 'translateX(50%) scaleX(1)' },
        }
      },


      width: {
        '40%': '40%',
      },
      blur: {
        "50": '50px',
      }
    },
  },
  plugins: [],

}
  
