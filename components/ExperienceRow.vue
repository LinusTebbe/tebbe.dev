<template>
  <tr>
    <td class="font-mono">{{start}}</td>
    <td>&nbsp;-&nbsp;</td>
    <td :class="end === undefined ? 'italic' : 'font-mono'">{{end ?? 'heute'}}</td>
    <td class="px-3 py-2">{{jobTitle}}</td>
    <td v-if="company !== undefined">@</td><td v-else></td>
    <td>{{company}}</td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
  start: string,
  end?: string,
  jobTitle: string,
  company?: string,
}>()
</script>