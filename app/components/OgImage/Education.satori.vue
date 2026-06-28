<script setup lang="ts">
withDefaults(defineProps<{
  degree?: string
  institution?: string
  dateRange?: string
  tags?: string[]
}>(), {
  degree: '',
  institution: '',
  dateRange: '',
  tags: () => [],
})
</script>

<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background:#14161a;color:#e7e5e0;padding:80px;font-family:'IBM Plex Sans', sans-serif;">
    <div style="display:flex;flex-direction:column;">
      <div style="display:flex;color:#e3ae3e;font-size:26px;font-family:'IBM Plex Mono', monospace;font-weight:500;">$ study --education</div>
      <div style="display:flex;font-size:72px;font-weight:700;margin-top:18px;letter-spacing:-1px;font-family:'Space Grotesk', sans-serif;">{{ degree }}</div>
      <div v-if="institution" style="display:flex;color:#e3ae3e;font-size:38px;margin-top:10px;font-weight:600;font-family:'Space Grotesk', sans-serif;">{{ institution }}</div>
      <div v-if="dateRange" style="display:flex;color:#93969b;font-size:26px;margin-top:16px;font-family:'IBM Plex Mono', monospace;">[{{ dateRange }}]</div>
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
