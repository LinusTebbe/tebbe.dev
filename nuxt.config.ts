import tailwindcss from '@tailwindcss/vite'

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/image'],
  site: {
    url: 'https://tebbe.dev',
    name: 'Linus Tebbe'
  },
  fonts: {
    families: [
      { name: 'Space Grotesk', weights: [500, 600, 700], global: true },
      { name: 'IBM Plex Sans', weights: [400, 500, 600], global: true },
      { name: 'IBM Plex Mono', weights: [400, 500], global: true },
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { innerHTML: themeInitScript },
      ],
      meta: [
        { name: 'theme-color', content: '#a6791c' },
        { name: 'theme-color', content: '#14161a',
          media: '(prefers-color-scheme: dark)' }
      ]
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    experimental: {
      localeDetector: 'localeDetector.ts'
    },
  },
  routeRules: {
    '/**': { prerender: true },
    '/api/cv/**': { prerender: false },
  },
  nitro: {
    prerender: {
      routes: ['/', '/de'],
      crawlLinks: true,
    },
  },
  runtimeConfig: {
    cvAccessKey: '',
    cvPhone: '',
    cvAddress: '',
    cvBirthDate: '',
    public: {
      cvName: 'Linus Tebbe',
      cvEmail: 'linus@tebbe.dev',
      cvWebsite: 'https://tebbe.dev',
      cvGithub: 'https://github.com/LinusTebbe',
      cvLinkedIn: 'https://www.linkedin.com/in/linus-tebbe/',
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})