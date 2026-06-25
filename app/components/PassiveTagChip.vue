<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
    <span
        class="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-content-muted"
    >
      {{ name }}
    </span>
</template>
