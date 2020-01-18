<template>
  <div class="min-h-screen md:flex bg-gray-100">
    <div :class="{ customHidden: SideBarHidden }" class="z-20 fixed md:relative content-between flex-wrap h-screen px-10 pt-5 flex left-0 max-w-xs bg-gray-700 shadow text-center text-white"  id="navbar">
      <div class="w-full">
        <img src="/logo.png" class="rounded-2">
        <div class="text-4xl mt-8">Linus Tebbe</div>
        <div>freiberuflicher Programmierer</div>
      </div>

      <div class="w-full md:mb-56">
        <ul class="text-xl align-middle">
          <li><nuxt-link to="/#übermich" class="hover:underline">Über mich</nuxt-link></li>
          <li><nuxt-link to="/#projekte" class="hover:underline">Projekte</nuxt-link></li>
        </ul>
      </div>

      <div class="w-full flex flex-col justify-center pb-1">
        <div class="w-full flex justify-center">
          <div class="text-left">
            <a href="https://github.com/LinusTebbe/" class="hover:underline" target="_blank"><fa :icon="['fab', 'github']" /> LinusTebbe</a><br>
            <a href="mailto:linus@tebbe.dev" class="hover:underline"><fa :icon="['fas', 'envelope']" /> linus@tebbe.dev</a>
          </div>  
        </div>
      
        <div class="text-xs block bottom-0 mt-3"><nuxt-link to="/impressum">Impressum</nuxt-link></div>
      </div>
    </div>
    <div class="flex-1 px-5">
      <div class="fixed right-0 top-0 m-3 md:hidden cursor-pointer" @click="SideBarHidden = !SideBarHidden">
        <svg class="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
      </div>
      <div class="block md:hidden fixed w-screen h-screen bg-black top-0 left-0 z-10 opacity-50" :class="{ hidden: SideBarHidden }" @click="SideBarHidden = !SideBarHidden"></div>
      <nuxt class="py-5" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    SideBarHidden: true
  })
}
</script>

<style scoped lang="scss">
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