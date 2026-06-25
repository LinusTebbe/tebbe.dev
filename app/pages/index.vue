<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  () => `home-${locale.value}`,
  async () => {
    const suffix = locale.value === 'de' ? 'de' as const : 'en' as const

    const [profile, experience, education, projects, skills] = await Promise.all([
      queryCollection(`profile_${suffix}`).first(),
      queryCollection(`experience_${suffix}`).order('featured', 'DESC').order('dateEnd', 'DESC').order('dateStart', 'DESC').all(),
      queryCollection(`education_${suffix}`).order('dateEnd', 'DESC').order('dateStart', 'DESC').all(),
      queryCollection(`projects_${suffix}`).order('dateEnd', 'DESC').order('dateStart', 'DESC').all(),
      queryCollection(`skills_${suffix}`).first(),
    ])

    return { profile, experience, education, projects, categories: skills?.categories ?? [] }
  },
  { watch: [locale] },
)

const { cvEmail, cvWebsite, cvGithub, cvLinkedIn, cvName } = useRuntimeConfig().public


const profile = computed(() => data.value?.profile)
const experience = computed(() => data.value?.experience ?? [])
const education = computed(() => data.value?.education ?? [])
const projects = computed(() => data.value?.projects ?? [])
const categories = computed(() => data.value?.categories ?? [])

const activeTag = ref<string | null>(null)

function toggleTag(slug: string) {
  activeTag.value = activeTag.value === slug ? null : slug
}

const filteredExperience = computed(() => {
  const tag = activeTag.value
  return tag ? experience.value.filter(item => (item.tags ?? []).includes(tag)) : experience.value
})

const filteredProjects = computed(() => {
  const tag = activeTag.value
  return tag ? projects.value.filter(item => (item.tags ?? []).includes(tag)) : projects.value
})

const filteredEducation = computed(() => {
  const tag = activeTag.value
  return tag ? education.value.filter(item => (item.tags ?? []).includes(tag)) : education.value
})

useSeoMeta({
  title: cvName,
  titleTemplate: '',
  description: () => profile.value?.summary,
})
</script>

<template>
  <main v-if="profile" class="mx-auto max-w-2xl px-4 py-12">
    <section class="flex flex-col gap-6 sm:flex-row sm:items-start">
      <NuxtImg
        src="/images/me.jpg"
        :alt="cvName"
        class="size-50 rounded-full border border-edge object-cover"
      />
      <div>
        <h1 class="font-display text-3xl font-semibold tracking-tight">{{ cvName }}</h1>
        <p class="mt-1 font-mono text-sm text-signal">
          {{ profile.headline }}
        </p>
        <p class="mt-3 max-w-prose text-content-muted">
          {{ profile.summary }}
        </p>
        <ul class="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-content-muted">
          <li>{{ cvEmail }}</li>
          <li><a :href="cvWebsite" class="hover:text-signal" target="_blank">{{ cvWebsite }}</a></li>
          <li><a :href="cvGithub" class="hover:text-signal" target="_blank">GitHub</a></li>
          <li><a :href="cvLinkedIn" class="hover:text-signal" target="_blank">LinkedIn</a></li>
        </ul>
      </div>
    </section>

    <section id="languages" class="mt-10">
      <h2 class="font-mono text-xs uppercase tracking-widest text-content-muted">
        {{ t('home.languages') }}
      </h2>
      <ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-content-muted">
        <li v-for="language in profile.languages" :key="language.name">
          {{ language.name }} — {{ language.level }}
        </li>
      </ul>
    </section>

    <section id="skills" class="mt-12">
      <h2 class="font-mono text-xs uppercase tracking-widest text-content-muted">
        {{ t('home.skills') }}
      </h2>
      <div class="mt-3 space-y-3">
        <div v-for="category in categories" :key="category.name">
          <p class="text-xs text-content-muted">
            {{ category.name }}
          </p>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <TagChip
              v-for="item in category.items"
              :key="item.slug"
              :slug="item.slug"
              :name="item.name"
              :active="activeTag === item.slug"
              @click="toggleTag"
            />
          </div>
        </div>
      </div>
    </section>

    <p v-if="activeTag" class="mt-6 font-mono text-sm text-signal">
      <span class="text-content-muted">$</span> filter --skill={{ activeTag }}
      <button
        type="button"
        class="ml-1 text-content-muted hover:text-signal cursor-pointer"
        :aria-label="t('common.clearFilter')"
        @click="activeTag = null"
      >
        ×
      </button>
    </p>

    <section v-if="filteredExperience.length" id="experience" class="mt-10">
      <h2 class="font-mono text-xs uppercase tracking-widest text-content-muted">
        {{ t('home.experience') }}
      </h2>
      <TransitionGroup tag="ul" name="filter-fade" class="relative mt-3 space-y-5">
        <div v-for="item in filteredExperience" :key="`${item.company}-${item.role}-${item.dateStart}`">
          <p class="font-mono text-xs text-content-muted">
            [{{ formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale) }}]
          </p>
          <NuxtLink v-if="item.body.value.length > 0" :to="localePath(item.path)" class="mt-0.5 block font-display font-medium hover:text-signal">
            {{ item.role }} · {{ item.company }}
            <i v-if="item.sideGig" class="text-xs text-content-muted">
              ({{ t('home.sideGig') }})
            </i>
          </NuxtLink>
          <p v-else class="mt-0.5 block font-display font-medium">
            {{ item.role }} · {{ item.company }}
            <i v-if="item.sideGig" class="text-xs text-content-muted">
              ({{ t('home.sideGig') }})
            </i>
          </p>
          <ul v-if="item.highlights?.length" class="mt-1 list-disc pl-5 text-sm text-content-muted">
            <li v-for="highlight in item.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <TagChip
              v-for="tag in resolveTagItems(item.tags ?? [], categories)"
              :key="tag.slug"
              :slug="tag.slug"
              :name="tag.name"
              :active="activeTag === tag.slug"
              @click="toggleTag"
            />
          </div>
        </div>
      </TransitionGroup>
    </section>

    <section v-if="filteredEducation.length" id="education" class="mt-10">
      <h2 class="font-mono text-xs uppercase tracking-widest text-content-muted">
        {{ t('home.education') }}
      </h2>
      <ul class="mt-3 space-y-5">
        <li v-for="item in filteredEducation" :key="`${item.institution}-${item.degree}-${item.dateStart}`">
          <p class="font-mono text-xs text-content-muted">
            [{{ formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale) }}]
          </p>
          <p class="mt-0.5 font-medium">
            {{ item.degree }} · {{ item.institution }}
          </p>
          <ul v-if="item.highlights?.length" class="mt-1 list-disc pl-5 text-sm text-content-muted">
            <li v-for="highlight in item.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <TagChip
              v-for="tag in resolveTagItems(item.tags ?? [], categories)"
              :key="tag.slug"
              :slug="tag.slug"
              :name="tag.name"
              :active="activeTag === tag.slug"
              @click="toggleTag"
            />
          </div>
        </li>
      </ul>
    </section>

    <section v-if="filteredProjects.length" id="projects" class="mt-10">
      <h2 class="font-mono text-xs uppercase tracking-widest text-content-muted">
        {{ t('home.projects') }}
      </h2>
      <TransitionGroup tag="div" name="filter-fade" class="relative mt-3 grid gap-3 sm:grid-cols-2">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.path"
          :project="project"
          :activeTag="activeTag"
          :categories="categories"
          :tagSelectable="true"
          @click="toggleTag"
        />
      </TransitionGroup>
    </section>
  </main>
</template>
