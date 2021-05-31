module.exports = {
  purge: [
    "./app/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'indigo': '#394263',
        'titleblue': '#66C8FC',
        'footerbg': '#21253E',
        'genresbg': '#505A7B',
      },
    },
    screens: {
      xs: '360px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
