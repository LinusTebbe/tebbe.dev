<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { preference, setPreference } = useTheme()
const route = useRoute()

const themeOptions = computed<{value: ThemePreference, label: string}[]>(() => [
  { value: 'system', label: t('theme.system') },
  { value: 'light', label: t('theme.light') },
  { value: 'dark', label: t('theme.dark') },
])

const sectionIds = ['experience', 'projects'] as const
const activeSection = ref<string | null>(null)
const headerEl = ref<HTMLElement>()

const visibleSections = new Set<string>()
let observer: IntersectionObserver | undefined

function updateActiveSection() {
  let next: string | null = null
  for (const id of sectionIds) {
    if (visibleSections.has(id)) next = id
  }
  activeSection.value = next
}

function bindSections() {
  observer?.disconnect()
  visibleSections.clear()
  activeSection.value = null

  const headerHeight = headerEl.value?.offsetHeight ?? 64
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleSections.add(entry.target.id)
      else visibleSections.delete(entry.target.id)
    }
    updateActiveSection()
  }, { rootMargin: `-${headerHeight + 8}px 0px -60% 0px` })

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
}

onMounted(bindSections)
onUnmounted(() => observer?.disconnect())

watch(() => route.path, async () => {
  await nextTick()
  bindSections()
})
</script>

<template>
  <header ref="headerEl" class="sticky top-0 z-10 border-b border-edge bg-surface/90 backdrop-blur">
    <nav class="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:justify-between">
      <NuxtLink
        :to="localePath('/')"
        class="mr-auto shrink-0 whitespace-nowrap font-display text-base font-semibold tracking-tight sm:mr-0"
      >
        Linus Tebbe
      </NuxtLink>
      <NuxtLink
        :to="`${localePath('/')}#experience`"
        :class="activeSection === 'experience' ? 'text-signal' : 'text-content-muted hover:text-content'"
        class="hidden shrink-0 transition-colors sm:inline"
      >
        {{ t('nav.experience') }}
      </NuxtLink>
      <NuxtLink
        :to="`${localePath('/')}#projects`"
        :class="activeSection === 'projects' ? 'text-signal' : 'text-content-muted hover:text-content'"
        class="hidden shrink-0 transition-colors sm:inline"
      >
        {{ t('nav.projects') }}
      </NuxtLink>
      <div class="flex shrink-0 items-center gap-3 font-mono text-xs sm:gap-4">
        <span class="flex items-center gap-2 pl-4">
          <NuxtLink
            v-for="l in locales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            :class="l.code === locale ? 'text-signal' : 'text-content-muted hover:text-content'"
            class="cursor-pointer transition-colors"
          >
            {{ l.code.toUpperCase() }}
          </NuxtLink>
        </span>

        <ClientOnly>
          <div class="flex items-center gap-0.5 rounded-full border border-edge p-0.5">
            <button
              v-for="option in themeOptions"
              :key="option.value"
              type="button"
              class="rounded-full px-2 py-1 transition-colors cursor-pointer select-none"
              :class="preference === option.value ? 'bg-signal text-surface' : 'text-content-muted hover:text-content'"
              @click="setPreference(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
          <template #fallback>
            <div class="h-6.5 w-37" />
          </template>
        </ClientOnly>
      </div>
    </nav>
  </header>
</template>
