/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  purge: {
    content: [
      './pages/*.vue',
      './pages/**/*.vue',
      './layouts/*.vue',
      './components/**/*.vue',
      './content/**/*.md',
    ],
    options: {
      whitelist: ['dark-mode'],
    }
  },
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    darkSelector: '.dark-mode',
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'experiences': 'auto auto auto auto auto auto',
      }
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
  },
  plugins: [
  ]
}
