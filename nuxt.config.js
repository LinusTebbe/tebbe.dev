
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'tebbe.dev | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'vue-scrollto/nuxt',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faGithub']
        },
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faEnvelope', 'faPhone']
        },
      ]
    }],
    '@nuxtjs/sitemap'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    linkExactActiveClass: 'active',
    scrollBehavior : async (to, from, savedPosition) => {
      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      };

      let parent = await findEl('#content');

      if (to.hash) {
        let el = await findEl(to.hash);
        return parent.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }

      return parent.scrollTo(0, 0);
    },

  },
  sitemap: {
    hostname: 'https://tebbe.dev'
  }
}
