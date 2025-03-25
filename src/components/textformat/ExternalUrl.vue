<script setup lang="ts">
defineProps<{
  url: URL
}>()
</script>

<template>
  <span class="meta overflow-ellipsis"
    ><span class="meta-highlight">{{ url.hostname }}</span
    >{{ url.pathname }}</span
  >
</template>
