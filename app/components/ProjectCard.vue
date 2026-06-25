<script setup lang="ts">
import PassiveTagChip from "~/components/PassiveTagChip.vue";

const { t, locale } = useI18n()
const localePath = useLocalePath()

defineProps<{
  project: {
    path: string
    dateStart: string
    dateEnd: string
    title: string
    description: string
    tags?: string[]
  },
  activeTag: string | null,
  categories: SkillCategory[],
  tagSelectable: boolean,
}>()

defineEmits<{ click: [slug: string] }>()
</script>

<template>
  <article
      class="rounded-lg border border-edge bg-surface-muted p-4"
  >
    <p class="font-mono text-xs text-content-muted">
      [{{ formatDateRange({ dateStart: project.dateStart, dateEnd: project.dateEnd }, locale) }}]
    </p>
    <NuxtLink :to="localePath(project.path)" class="mt-0.5 block font-display font-medium hover:text-signal">
      {{ project.title }}
    </NuxtLink>
    <p class="mt-1 text-sm text-content-muted">
      {{ project.description }}
    </p>
    <div class="mt-2 flex flex-wrap gap-1.5">
      <TagChip
          v-if="tagSelectable"
          v-for="tag in resolveTagItems(project.tags ?? [], categories)"
          :key="tag.slug"
          :slug="tag.slug"
          :name="tag.name"
          :active="activeTag === tag.slug"
          @click="(slug) => $emit('click', slug)"
      />
      <PassiveTagChip
        v-else
        v-for="tag in resolveTagItems(project.tags ?? [], categories)"
        :key="tag.slug"
        :name="tag.name"
      />
    </div>
    <NuxtLink :to="localePath(project.path)" class="mt-2 inline-block font-mono text-xs text-signal hover:underline">
      {{ t('home.viewProject') }} →
    </NuxtLink>
  </article>
</template>

<style scoped>

</style>