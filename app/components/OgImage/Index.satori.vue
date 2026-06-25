<script setup lang="ts">
withDefaults(defineProps<{
  name?: string
  headline?: string
  summary?: string
}>(), {
  name: 'Linus Tebbe',
  headline: '',
  summary: '',
})
</script>

<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background:#14161a;color:#e7e5e0;padding:80px;font-family:'IBM Plex Sans', sans-serif;">
    <div style="display:flex;flex-direction:column;">
      <div style="display:flex;color:#e3ae3e;font-size:26px;font-family:'IBM Plex Mono', monospace;font-weight:500;">$ whoami</div>
      <div style="display:flex;font-size:88px;font-weight:700;margin-top:18px;letter-spacing:-2px;font-family:'Space Grotesk', sans-serif;">{{ name }}</div>
      <div v-if="headline" style="display:flex;color:#e3ae3e;font-size:34px;margin-top:10px;font-family:'IBM Plex Mono', monospace;">{{ headline }}</div>
      <div v-if="summary" style="display:flex;color:#93969b;font-size:28px;margin-top:28px;max-width:960px;line-height:1.4;">{{ summary }}</div>
    </div>
    <div style="display:flex;color:#e3ae3e;font-size:26px;border-top:1px solid #2a2d33;padding-top:26px;font-family:'IBM Plex Mono', monospace;font-weight:500;">tebbe.dev</div>
  </div>
</template>
