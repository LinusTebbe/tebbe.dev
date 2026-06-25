<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  dateRange?: string
  tags?: string[]
}>(), {
  title: '',
  description: '',
  dateRange: '',
  tags: () => [],
})
</script>

<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background:#14161a;color:#e7e5e0;padding:80px;font-family:'IBM Plex Sans', sans-serif;">
    <div style="display:flex;flex-direction:column;">
      <div style="display:flex;color:#e3ae3e;font-size:26px;font-family:'IBM Plex Mono', monospace;font-weight:500;">$ cat project</div>
      <div style="display:flex;font-size:76px;font-weight:700;margin-top:18px;letter-spacing:-2px;font-family:'Space Grotesk', sans-serif;">{{ title }}</div>
      <div v-if="dateRange" style="display:flex;color:#93969b;font-size:26px;margin-top:10px;font-family:'IBM Plex Mono', monospace;">[{{ dateRange }}]</div>
      <div v-if="description" style="display:flex;color:#93969b;font-size:28px;margin-top:28px;max-width:1000px;line-height:1.4;">{{ description }}</div>
    </div>
    <div style="display:flex;flex-direction:column;">
      <div v-if="tags?.length" style="display:flex;flex-wrap:wrap;margin-bottom:14px;">
        <div
          v-for="tag in tags"
          :key="tag"
          style="display:flex;border:1px solid #2a2d33;border-radius:999px;color:#93969b;font-size:22px;padding:6px 18px;margin-right:12px;margin-bottom:12px;font-family:'IBM Plex Mono', monospace;"
        >{{ tag }}</div>
      </div>
      <div style="display:flex;color:#e3ae3e;font-size:26px;border-top:1px solid #2a2d33;padding-top:26px;font-family:'IBM Plex Mono', monospace;font-weight:500;">tebbe.dev</div>
    </div>
  </div>
</template>
