<template>
  <div>
    <div class="-mt-5 pt-5 flex flex-wrap" id="aboutme">
      <div class="w-full md:w-1/2 md:pr-2">
        <Card class="h-full">
          <h1>Über mich</h1>
          <p>
            Hi, ich bin Linus.<br>
            Ein Full-Stack Developer aus Essen 👋
          </p>
        </Card>
      </div>
      <div class="w-full pt-4 md:pt-0 md:w-1/2 md:pl-2">
        <Card class="h-full">
          <h1>Meine Skills</h1>
          <ul>
            <li>SQL (MySQL, MariaDB, MSSQL, etc.)</li>
            <li>HTML5, CSS3</li>
            <li>TailwindCSS, Bootstrap, UIKit</li>
            <li>JavaScript, Typescript, Node.JS, Vue.JS, Nuxt3</li>
            <li>PHP, Laravel (Zero), Symfony, Laminas, Mezzio</li>
            <li>Wordpress, Shopware</li>
            <li>Dart, Flutter</li>
            <li>Java</li>
            <li>Python</li>
            <li>Linux, Windows, Android</li>
          </ul>
        </Card>
      </div>
    </div>
    <div class="pt-5" id="experiences">
      <Card>
        <h1>Berufserfahrung</h1>
        <div>
          <table class="divide-y-2 divide-gray-700">
            <ExperienceRow start="11/2019" job-title="Freiberuflicher Softwareentwickler"/>
            <ExperienceRow start="12/2024" job-title="Senior IT Professional" company="Aldi DX"/>
            <ExperienceRow start="07/2023" end="11/2024" job-title="Professional Software Entwickler" company="CHECK24 Hotel"/>
            <ExperienceRow start="06/2022" end="06/2023" job-title="Junior Software Entwickler" company="CHECK24 Hotel"/>
            <ExperienceRow start="08/2020" end="06/2022" job-title="Ausbildung Fachinformatiker" company="CHECK24 Hotel"/>
          </table>
        </div>
      </Card>
    </div>
    <div class="pt-5" id="projects">
      <Card>
        <h1>Projekte</h1>
        <div class="text-gray-600">Meine bisherigen & aktuellen Projekte</div>
      </Card>
      <Card v-for="project in projects" :key="project.path">
        <h3>{{ project.title }}</h3>
        <ProjectTimespan :project="project"/>
        <div>{{ project.description }}</div>
        <NuxtLink class="gray-btn" :to="project._path">Details</NuxtLink>
      </Card>
    </div>

  </div>
</template>

<script setup lang="ts">
const projects = await queryContent('projekte')
  .only(['title', 'description', 'start', 'end', '_path'])
  .sort({'end': -1})
  .find();
useHead({
  title: 'tebbe.dev',
  titleTemplate: '',
})
</script>
