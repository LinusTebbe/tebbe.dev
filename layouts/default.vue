<template>
  <div class="h-screen md:flex bg-gray-100 overflow-hidden">
    <div :class="{ customHidden: SideBarHidden }" class="z-20 fixed md:relative content-between flex-wrap h-full px-10 pt-5 flex left-0 max-w-xs bg-gray-700 shadow text-center text-white overflow-auto"  id="navbar">
      <div class="w-full">
        <img src="/logo.png" alt="logo" class="rounded-2">
        <div class="text-4xl mt-8">Linus Tebbe</div>
        <div>freiberuflicher Programmierer</div>
      </div>

      <div class="w-full md:mb-56">
        <ul class="text-xl align-middle">
          <li @click="close"><nuxt-link :to="{path: '/', hash: '#übermich'}" class="hover:underline">Über mich</nuxt-link></li>
          <li @click="close"><nuxt-link :to="{path: '/', hash: '#projekte'}" class="hover:underline">Projekte</nuxt-link></li>
        </ul>
      </div>

      <div class="w-full flex flex-col justify-center pb-1">
        <div class="w-full flex justify-center">
          <div class="text-left text-normal">
            <a href="https://github.com/LinusTebbe/" class="hover:underline" target="_blank"><fa :icon="['fab', 'github']"/> LinusTebbe</a><br>
            <a :href="'mailto:' + meta.email" class="hover:underline"><fa :icon="['fas', 'envelope']"/> linus@tebbe.dev</a><br>
            <a v-bind:href="'tel:+49' + meta.telephone" class="hover:underline"><fa :icon="['fas', 'phone']"/>02509-2094947</a>
          </div>
        </div>
        <div class="text-s block bottom-0 mt-3">© {{ new Date().getFullYear() }} | <span @click="close"><nuxt-link to="/impressum" class="hover:underline">Impressum</nuxt-link></span></div>
      </div>
    </div>
    <div class="flex-1 px-5 overflow-auto h-screen" id="content">
      <div class="fixed right-0 top-0 m-5 md:hidden cursor-pointer z-30" @click="toggle">
        <svg class="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
      </div>
      <div class="block md:hidden fixed w-screen h-screen bg-black top-0 left-0 z-10 opacity-50" :class="{ hidden: SideBarHidden }" @click="toggle"></div>
      <nuxt class="py-5" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    SideBarHidden: true,
    meta: {
      '@context': 'http://schema.org',
      '@type': 'Corporation',
      'name': process.env.npm_package_meta_companyName,
      'description': process.env.npm_package_description,
      'email': process.env.npm_package_meta_email,
      'openingHours': process.env.npm_package_meta_openingHours,
      'address': process.env.npm_package_meta_address,
      'telephone': process.env.npm_package_meta_phone,
      'url': 'https://tebbe.dev'
    }
  }),
  jsonld() {
    return this.meta
  },
  methods: {
    toggle () {
      this.SideBarHidden = !this.SideBarHidden;
    },
    close () {
      this.SideBarHidden = true;
    }
  }
}
</script>

<style scoped lang="scss">
.hidden {
  @apply hidden;
}

.svg-inline--fa {
  @apply svg-inline--fa;
}

.fa-w-16 {
  @apply fa-w-16;
}

.customHidden {
  left: -20rem;
}

@screen md {
  .customHidden {
    left: unset;
  }
}

@media (max-height: 800px) {
  #navbar > div:nth-child(2) {
    margin-bottom: unset;
  }
}

#navbar {
  transition: all 0.3s;
}
</style>
