import tailwindcss from '@tailwindcss/vite'

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/image'],
  site: {
    url: 'https://tebbe.dev',
    name: 'Linus Tebbe'
  },
  ogImage: {
    enabled: false,
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