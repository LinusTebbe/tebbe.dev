<template>
  <div class="colorModePicker m-6 text-3xl noSelect cursor-pointer" @click="$colorMode.preference = $colorMode.preference === 'light' ? 'dark' : 'light'">
    <fa :icon="['fas', 'adjust']"></fa>
  </div>
</template>

<style>
  .colorModePicker {

  }
</style>
