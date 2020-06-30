/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  purge: {
    enabled: false,
    content: [
      './pages/*.vue',
      './pages/**/*.vue',
      './layouts/*.vue',
      './components/**/*.vue',
      './content/**/*.md',
      './node_modules/tailwindcss-dark-mode/prefers-dark.js',
    ],
    options: {
      whitelist: ['dark-mode', 'h1', 'h2', 'h3'],
      whitelistPatterns: [/dark.*/]
    }
  },
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    darkSelector: '.dark-mode'
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ]
}
