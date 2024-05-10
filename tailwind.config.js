/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Playfair': ['Playfair Display', 'serif', ],
      'Sora': ['Sora', 'sans-serif', ]
   
      
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ]
}

