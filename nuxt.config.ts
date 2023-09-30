// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: 'tebbe.dev | %s',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: process.env.npm_package_description}
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
  ],
  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    { src: '~/plugins/scroll-behavior.client.ts', mode: 'client' }
  ]
})
