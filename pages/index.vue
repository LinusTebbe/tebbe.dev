<template>
  <div>
    <div class="-mt-5 pt-5 flex flex-wrap" id="übermich">
      <div class="w-full md:w-1/2 md:pr-2">
        <Card class="h-full">
          <h1>Über mich</h1>
          Ich bin Linus, ein Full-Stack Developer, aus dem Münsterland.<br>
          <br>
          Profitieren Sie von meiner Jahrelangen Erfahrung im Bereich der Webentwicklung.<br>
          Sei es eine komplette Webplattform, oder doch nur ein recht simples Kommandozeilen-Tool, ich kann Ihnen behilflich sein!<br>
          Kontaktieren Sie mich, und ich bin mir sicher, dass ich Ihnen ein gutes Angebot machen kann!<br>
        </Card>
      </div>
      <div class="w-full pt-4 md:pt-0 md:w-1/2 md:pl-2">
        <Card class="h-full">
          <h1>Benutzte Technologien</h1>
          SQL (MySQL, MSSQL, etc.)<br>
          HTML<br>
          CSS, TailwindCSS, Bootstrap, UIKit<br>
          JS, Node.JS, Vue.JS, Nuxt<br>
          PHP, Laravel (Zero), Symfony<br>
          Wordpress, Shopware<br>
          Flutter, Java, Python<br>
          Linus, Windows, Android<br>
        </Card>
      </div>
    </div>
    <div class="pt-5 mt-5" id="projekte">
      <Card>
        <h1>Projekte</h1>
        <div class="text-gray-600">Meine bisherigen Projekte</div>
      </Card>
      <Card v-for="project in projects" :key="project.path">
        <h3>{{ project.title }}</h3>
        <ProjectTimespan :project="project"/>
        <div>{{ project.description }}</div>
        <nuxt-link class="gray-btn" :to="project.path">Details</nuxt-link>
      </Card>
    </div>

  </div>
</template>

<script>
  export default {
    async asyncData ({ $content }) {
      const projects = await $content('projekte')
        .only(['title', 'description', 'start', 'end', 'path'])
        .sortBy('end', 'desc')
        .fetch();

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
