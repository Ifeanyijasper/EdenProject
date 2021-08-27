module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       width: {
        '17/100': '17%',
        '55': '55%',
        '145': "45rem",
        '140': "32rem",
        '150': "40rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
