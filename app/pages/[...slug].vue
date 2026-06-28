<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const path = useUnlocalizedPath()

const { data } = await useAsyncData(
  () => `slug-content-${locale.value}-${path.value}`,
  async () => {
    const pagesCollection = locale.value === 'de' ? 'pages_de' as const : 'pages_en' as const
    const page = await queryCollection(pagesCollection).path(path.value).first()
    if (page) return { kind: 'page' as const, item: page, categories: [] as SkillCategory[] }


    const skillsCollection = locale.value === 'de' ? 'skills_de' as const : 'skills_en' as const
    const skills = await queryCollection(skillsCollection).first()

    const projectsCollection = locale.value === 'de' ? 'projects_de' as const : 'projects_en' as const
    const project = await queryCollection(projectsCollection).path(path.value).first()
    if (project) {
      return { kind: 'project' as const, item: project, categories: skills?.categories ?? [] }
    }

    const experienceCollection = locale.value === 'de' ? 'experience_de' as const : 'experience_en' as const
    const experience = await queryCollection(experienceCollection).path(path.value).first()
    if (experience) {
      if (experience.body.value.length === 0) return null
      const projects = await queryCollection(projectsCollection).order('dateEnd', 'DESC').order('dateStart', 'DESC').where('title', 'IN', experience.projects).all()
      return { kind: 'experience' as const, item: experience, categories: skills?.categories ?? [], projects: projects ?? [] }
    }

    const educationCollection = locale.value === 'de' ? 'education_de' as const : 'education_en' as const
    const education = await queryCollection(educationCollection).path(path.value).first()
    if (education) {
      const projects = await queryCollection(projectsCollection).order('dateEnd', 'DESC').order('dateStart', 'DESC').where('title', 'IN', education.projects).all()
      // No detail page unless there is something to show beyond the list entry.
      if (education.body.value.length === 0 && projects.length === 0) return null
      return { kind: 'education' as const, item: education, categories: skills?.categories ?? [], projects: projects ?? [] }
    }

    return null
  },
  { watch: [locale, path] },
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
useSeoMeta({
  title: () => data.value?.item.title ?? '',
  description: () => data.value?.item.description ?? '',
})

if (data.value?.kind === 'project') {
  const project = data.value.item
  defineOgImageComponent('Project', {
    title: project.title,
    description: project.description ?? '',
    dateRange: formatDateRange({ dateStart: project.dateStart, dateEnd: project.dateEnd }, locale.value),
    tags: resolveTagNames(project.tags ?? [], data.value.categories).slice(0, 6),
  })
}
else if (data.value?.kind === 'experience') {
  const experience = data.value.item
  defineOgImageComponent('Experience', {
    role: experience.role,
    company: experience.company,
    dateRange: formatDateRange({ dateStart: experience.dateStart, dateEnd: experience.dateEnd }, locale.value),
    tags: resolveTagNames(experience.tags ?? [], data.value.categories).slice(0, 6),
  })
}
else if (data.value?.kind === 'education') {
  const education = data.value.item
  defineOgImageComponent('Education', {
    degree: education.degree,
    institution: education.institution,
    dateRange: formatDateRange({ dateStart: education.dateStart, dateEnd: education.dateEnd }, locale.value),
    tags: resolveTagNames(education.tags ?? [], data.value.categories).slice(0, 6),
  })
}
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-12">
    <template v-if="data?.kind === 'project'">
      <NuxtLink
        :to="`${localePath('/')}#projects`"
        class="font-mono text-xs text-content-muted hover:text-signal"
      >
        ← {{ t('projects.back') }}
      </NuxtLink>
      <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">
        {{ data.item.title }}
      </h1>
      <p class="mt-1 font-mono text-xs text-content-muted">
        [{{ formatDateRange({ dateStart: data.item.dateStart, dateEnd: data.item.dateEnd }, locale) }}]
      </p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <span
          v-for="tag in resolveTagNames((data.item.tags ?? []), data.categories)"
          :key="tag"
          class="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-content-muted"
        >
          {{ tag }}
        </span>
      </div>
      <p v-if="data.item.link || data.item.repo" class="mt-3 flex gap-3 font-mono text-xs text-signal">
        <a v-if="data.item.link" :href="data.item.link" target="_blank" class="hover:underline">{{ t('projects.visitSite') }} →</a>
        <a v-if="data.item.repo" :href="data.item.repo" target="_blank" class="hover:underline">{{ t('projects.viewRepo') }} →</a>
      </p>
      <ContentRenderer
        :value="data.item"
        class="prose-content mt-6"
      />
    </template>
    <template v-else-if="data?.kind === 'experience'">
      <NuxtLink
          :to="`${localePath('/')}#experience`"
          class="font-mono text-xs text-content-muted hover:text-signal"
      >
        ← {{ t('experience.back') }}
      </NuxtLink>
      <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">
        {{ data.item.role }} · {{ data.item.company }}
      </h1>
      <p class="mt-1 font-mono text-xs text-content-muted">
        [{{ formatDateRange({ dateStart: data.item.dateStart, dateEnd: data.item.dateEnd }, locale) }}]
      </p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <span
            v-for="tag in resolveTagNames((data.item.tags ?? []), data.categories)"
            :key="tag"
            class="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-content-muted"
        >
          {{ tag }}
        </span>
      </div>
      <ContentRenderer
          :value="data.item"
          class="prose-content mt-6"
      />
      <div v-if="data.projects.length > 0">
        <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">{{ t('home.projects') }}</h1>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <ProjectCard
            v-for="project in data.projects"
            :key="project.path"
            :project="project"
            :activeTag="null"
            :categories="data.categories"
            :tagSelectable="false"
          />
        </div>
      </div>
    </template>
    <template v-else-if="data?.kind === 'education'">
      <NuxtLink
          :to="`${localePath('/')}#education`"
          class="font-mono text-xs text-content-muted hover:text-signal"
      >
        ← {{ t('education.back') }}
      </NuxtLink>
      <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">
        {{ data.item.degree }} · {{ data.item.institution }}
      </h1>
      <p class="mt-1 font-mono text-xs text-content-muted">
        [{{ formatDateRange({ dateStart: data.item.dateStart, dateEnd: data.item.dateEnd }, locale) }}]
      </p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <span
            v-for="tag in resolveTagNames((data.item.tags ?? []), data.categories)"
            :key="tag"
            class="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-content-muted"
        >
          {{ tag }}
        </span>
      </div>
      <ContentRenderer
          v-if="data.item.body.value.length > 0"
          :value="data.item"
          class="prose-content mt-6"
      />
      <div v-if="data.projects.length > 0">
        <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">{{ t('home.projects') }}</h1>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <ProjectCard
            v-for="project in data.projects"
            :key="project.path"
            :project="project"
            :activeTag="null"
            :categories="data.categories"
            :tagSelectable="false"
          />
        </div>
      </div>
    </template>
    <ContentRenderer
      v-else-if="data"
      :value="data.item"
      class="prose-content"
    />
  </main>
</template>
