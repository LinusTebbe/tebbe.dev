<template>
  <div class="h-screen md:flex bg-gray-300 dark:bg-black dark:text-white overflow-hidden">
    <div :class="{ customHidden: SideBarHidden }" class="z-20 fixed md:relative content-between flex-wrap h-screen px-10 pt-5 flex left-0 max-w-xs bg-gray-700 shadow text-center text-white overflow-auto"  id="navbar">
      <div class="w-full flex flex-col grow gap-3 max-h-[120rem]">
        <nuxt-link to="/" class="logo">
          <NuxtPicture format="webp" src="/img/me.jpg" :imgAttrs="{class: 'rounded-full w-full'}" />
        </nuxt-link>
        <div class="max-h-64 grow flex flex-col place-content-between">
          <div>
            <h1 class="text-4xl mt-8">Linus Tebbe</h1>
            <p>freiberuflicher Programmierer</p>
          </div>
          <ul class="text-xl align-middle my-2">
            <li @click="close"><nuxt-link :to="{path: '/', hash: '#aboutme'}" class="hover:underline">Über mich</nuxt-link></li>
            <li @click="close"><nuxt-link :to="{path: '/', hash: '#experiences'}" class="hover:underline">Berufserfahrung</nuxt-link></li>
            <li @click="close"><nuxt-link :to="{path: '/', hash: '#projects'}" class="hover:underline">Projekte</nuxt-link></li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center pb-1">
        <h3>Kontakt</h3>
        <hr>
        <div class="w-full flex justify-center">
          <div class="text-left text-normal">
            <a href="https://github.com/LinusTebbe/" class="hover:underline" target="_blank"><font-awesome-icon :icon="['fab', 'github']"/> LinusTebbe</a><br>
            <a href="https://www.linkedin.com/in/linus-tebbe/" class="hover:underline" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']"/> Linus Tebbe</a><br>
            <a href="mailto:linus@tebbe.dev" class="hover:underline"><font-awesome-icon :icon="'envelope'"/> linus@tebbe.dev</a><br>
          </div>
        </div>
        <hr>
        <div class="text-s block bottom-0 mt-3">© {{ new Date().getFullYear() }} | <span @click="close"><nuxt-link to="/impressum" class="hover:underline">Impressum</nuxt-link></span></div>
      </div>
    </div>
    <div class="flex-1 px-5 overflow-auto h-screen" id="content">
      <div class="fixed right-0 top-0 m-5 md:hidden cursor-pointer z-30 noSelect" @click="toggle">
        <svg class="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
      </div>
      <div class="block md:hidden fixed w-screen h-screen bg-black top-0 left-0 z-10 opacity-50" :class="{ hidden: SideBarHidden }" @click="toggle"></div>
      <slot class="py-5" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {faLinkedin, faGithub} from "@fortawesome/fontawesome-free-brands";
library.add(faEnvelope, faLinkedin, faGithub)
</script>

<script lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},
  data: () => ({
    SideBarHidden: true,
    meta: {
      '@context': 'http://schema.org',
      '@type': 'Corporation',
      'name': process.env.npm_package_meta_companyName,
      'description': process.env.npm_package_description,
      'email': process.env.npm_package_meta_email,
      'address': process.env.npm_package_meta_address,
      'url': 'https://tebbe.dev'
    }
  }),
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
