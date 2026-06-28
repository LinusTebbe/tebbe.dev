<script setup lang="ts">
import type {Languages} from "#shared/types/languages";

const { t, locale } = useI18n()
const localePath = useLocalePath()
const path = useUnlocalizedPath()

const loadLinkedProjects = (titles: string[], suffix: Languages) =>
    queryCollection(`projects_${suffix}`).order('dateEnd', 'DESC').order('dateStart', 'DESC').where('title', 'IN', titles).all()

const { data } = await useAsyncData(
  () => `slug-content-${locale.value}-${path.value}`,
  async () => {
    const suffix = locale.value === 'de' ? 'de' as const : 'en' as const

    const page = await queryCollection(`pages_${suffix}`).path(path.value).first()
    if (page) return { kind: 'page' as const, item: page, categories: [] as SkillCategory[] }

    const skills = await queryCollection(`skills_${suffix}`).first()
    const categories = skills?.categories ?? []

    const project = await queryCollection(`projects_${suffix}`).path(path.value).first()
    if (project) return { kind: 'project' as const, item: project, categories }

    const experience = await queryCollection(`experience_${suffix}`).path(path.value).first()
    if (experience) {
      if (experience.body.value.length === 0) return null
      return { kind: 'experience' as const, item: experience, categories, projects: await loadLinkedProjects(experience.projects ?? [], suffix) }
    }

    const education = await queryCollection(`education_${suffix}`).path(path.value).first()
    if (education) {
      const projects = await loadLinkedProjects(education.projects ?? [], suffix)
      if (education.body.value.length === 0 && projects.length === 0) return null
      return { kind: 'education' as const, item: education, categories, projects }
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

const item = computed(() => {
  const d = data.value
  return d && d.kind !== 'page' ? d.item : null
})

const links = computed(() =>
  data.value?.kind === 'project' ? { site: data.value.item.link, repo: data.value.item.repo } : undefined,
)

const title = computed(() => {
  switch (data.value?.kind) {
    case 'project': return data.value.item.title
    case 'experience': return `${data.value.item.role} · ${data.value.item.company}`
    case 'education': return `${data.value.item.degree} · ${data.value.item.institution}`
    default: return ''
  }
})

const backAnchor = computed(() => {
  switch (data.value?.kind) {
    case 'project': return 'projects'
    case 'experience': return 'experience'
    case 'education': return 'education'
    default: return ''
  }
})

const backLabel = computed(() => {
  switch (data.value?.kind) {
    case 'project': return t('projects.back')
    case 'experience': return t('experience.back')
    case 'education': return t('education.back')
    default: return ''
  }
})

defineSlugOgImage(data.value, locale.value)
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 py-12">
    <template v-if="item">
      <NuxtLink
        :to="`${localePath('/')}#${backAnchor}`"
        class="font-mono text-xs text-content-muted hover:text-signal"
      >
        ← {{ backLabel }}
      </NuxtLink>
      <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">
        {{ title }}
      </h1>
      <p class="mt-1 font-mono text-xs text-content-muted">
        [{{ formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale) }}]
      </p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <span
          v-for="tag in resolveTagNames(item.tags ?? [], data?.categories ?? [])"
          :key="tag"
          class="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-content-muted"
        >
          {{ tag }}
        </span>
      </div>
      <p v-if="links && (links.site || links.repo)" class="mt-3 flex gap-3 font-mono text-xs text-signal">
        <a v-if="links.site" :href="links.site" target="_blank" class="hover:underline">{{ t('projects.visitSite') }} →</a>
        <a v-if="links.repo" :href="links.repo" target="_blank" class="hover:underline">{{ t('projects.viewRepo') }} →</a>
      </p>
      <ContentRenderer
        v-if="item.body.value.length > 0"
        :value="item"
        class="prose-content mt-6"
      />
      <div v-if="(data?.projects ?? []).length > 0">
        <h1 class="mt-3 font-display text-2xl font-semibold tracking-tight">{{ t('home.projects') }}</h1>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <ProjectCard
            v-for="project in data?.projects"
            :key="project.path"
            :project="project"
            :activeTag="null"
            :categories="data?.categories ?? []"
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
