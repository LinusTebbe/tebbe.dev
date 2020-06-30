<template>
  <div>
    <div class="-mt-5 pt-5" id="übermich">
      <Card>
        <h1>Über mich</h1>
        <div class="text-lg">
          Ich bin Linus, ein Full-Stack Developer, aus dem Münsterland.<br>
          Aktuell besuche ich ein Berufskolleg für Technik und Gestaltung, bei dem ich dieses Jahr mein Abitur abschließen werde.<br>
          Ich programmiere hobbymäßig bereits seit ~9 Jahren und bin seit März 2018 beruflich in diesem Bereich tätig.<br>
          Zuerst auf MiniJob Basis, seit November 2019 aber auf Freiberuflicher Basis.<br>
        </div>
      </Card>
    </div>
    <div class="pt-5 mt-5" id="projekte">
      <Card>
        <h1>Projekte</h1>
        <div class="text-gray-600">Meine bisherigen Projekte</div>
      </Card>
      <Card v-for="project in projects" :key="project.path">
        <h3>{{ project.title }}</h3>
        <div class="text-gray-600 mb-1"><span v-html="project.start"></span><span v-if="project.end"> - <span v-html="project.end"></span></span></div>
        <div>{{ project.description }}</div>
        <nuxt-link class="gray-btn" :to="project.path">Details</nuxt-link>
      </Card>
    </div>

  </div>
</template>

<script>
  export default {
    async asyncData ({ $content }) {
      const projects = await $content('projekte').only(['title', 'description', 'start', 'end', 'path']).fetch();

      return {
        projects
      }
    },
    head () {
      return {
        title: 'Start'
      }
    }
  }
</script>

<style lang="css" scoped>

  .sub {
    @apply font-normal ml-4 text-lg;
  }

  #technologies > div {
    @apply px-3 w-auto;
  }

  #technologies a {
    @apply underline;
  }
</style>

<style>


.gray-btn {
  @apply bg-gray-800 shadow text-white font-bold py-1 px-4 rounded text-lg mt-4 inline-block;
}

.gray-btn:hover {
  @apply bg-black shadow-lg;
}

.card {
  @apply shadow bg-white p-5 rounded-sm;
}
</style>
