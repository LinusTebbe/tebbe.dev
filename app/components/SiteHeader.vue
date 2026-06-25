<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { preference, setPreference } = useTheme()

const themeOptions = computed<{value: ThemePreference, label: string}[]>(() => [
  { value: 'system', label: t('theme.system') },
  { value: 'light', label: t('theme.light') },
  { value: 'dark', label: t('theme.dark') },
])
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-edge bg-surface/90 backdrop-blur">
    <nav class="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
      <NuxtLink
        :to="localePath('/')"
        class="font-display text-base font-semibold tracking-tight"
      >
        Linus Tebbe
      </NuxtLink>
      <NuxtLink :to="`${localePath('/')}#experience`" class="text-content-muted hover:text-content">
        {{ t('nav.experience') }}
      </NuxtLink>
      <NuxtLink :to="`${localePath('/')}#projects`" class="text-content-muted hover:text-content">
        {{ t('nav.projects') }}
      </NuxtLink>
      <div class="flex items-center gap-4 font-mono text-xs">
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
