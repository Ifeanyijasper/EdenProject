module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       width: {
        '17/100': '17%',
        '55': '55%',
        '132': "45rem",
        '120': "32rem",
        '128': "40rem",
      },
      height: {
        '17/100': '17%',
        '55': '55%',
        '132': "45rem",
        '120': "32rem",
        '128': "40rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
