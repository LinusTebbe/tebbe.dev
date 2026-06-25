<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-edge">
    <div class="mx-auto flex max-w-2xl items-center justify-between px-4 py-6 font-mono text-xs text-content-muted">
      <span>© {{ year }} Linus Tebbe</span>
      <NuxtLink :to="localePath('/impressum')" class="hover:text-content">
        {{ t('footer.imprint') }}
      </NuxtLink>
    </div>
  </footer>
</template>
