<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'

defineProps<{
  source: string
}>()
</script>

<template>
  <div class="md">
    <VueMarkdown :source />
  </div>
</template>

<style></style>
