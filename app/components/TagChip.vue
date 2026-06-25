<script setup lang="ts">
defineProps<{ slug: string, name: string, active: boolean }>()
defineEmits<{ click: [slug: string] }>()
</script>

<template>
  <button
    type="button"
    class="rounded-full border px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer"
    :class="active
      ? 'border-signal bg-signal text-surface'
      : 'border-edge text-content-muted hover:border-signal hover:text-signal'"
    @click="$emit('click', slug)"
  >
    {{ name }}
  </button>
</template>
