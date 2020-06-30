<template>
  <div>
    <Card>
      <div class="w-full flex flex-wrap">
        <div class="w-full lg:w-1/2 xl:w-1/3">
          <h1>{{ page.title }}</h1>
          <div class="text-gray-600 mb-1"><span v-html="page.start"></span><span v-if="page.end"> - <span v-html="page.end"></span></span></div>
        </div>
        <div class="w-full lg:w-1/2 xl:w-1/4 text-lg">
          {{ page.description }}
        </div>
        <div class="w-full">
          <a v-if="page.link" :href="page.link" rel="noreferrer" target="_blank" class="gray-btn">Website</a>
        </div>
      </div>
    </Card>
    <nuxt-content :document="page" />
  </div>
</template>

<script>
  export default {
    async asyncData ({ $content, params }) {
      const page = await $content(params.pathMatch).fetch()

      return {
        page
      }
    }
  }
</script>
