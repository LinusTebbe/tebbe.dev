<template>
  <div class="text-gray-600 mb-1">
    <span>{{ getFormattedDateForProject(project.start) }}</span>
    <span v-if="project.start !== project.end"> -
      <span v-if="project.end == '999999'"><i>heute</i></span>
      <span v-else>{{ getFormattedDateForProject(project.end) }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import ProjectInterface from '@/interfaces/ProjectInterface';

const props = defineProps<{
  project: ProjectInterface,
}>();
</script>

<script lang="ts">
export default {
  methods: {
    getFormattedDateForProject: (input: number) => {
      const date = new Date(
          Number(String(input).substring(0, 4)),
          (Number(String(input).substring(4, 6)) - 1)
      );

      return date.toLocaleDateString('de-DE', {month: "long"}) + ' ' + date.toLocaleDateString('de-DE', {year: "numeric"})
    }
  }
}
</script>
