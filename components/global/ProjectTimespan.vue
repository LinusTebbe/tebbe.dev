<template>
  <div class="text-gray-600 mb-1">
    <span>{{ $moment(project.start, "YYYYMM").format('MMMM YYYY') }}</span>
    <span v-if="project.start !== project.end"> -
      <span v-html="project.end === 999999 ? ' <i>heute</i>' : $moment(project.end, 'YYYYMM').format('MMMM YYYY')"></span>
    </span>
  </div>
</template>

<script>
  export default {
    props: [
      'project'
    ]
  }
</script>
