module.exports = {
  purge: [
    "./app/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xs: '360px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1440px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
