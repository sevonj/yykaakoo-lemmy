<script setup lang="ts">
defineProps<{
  title: string
  text: string
  color?: { type: string; default: 'white' }
}>()
</script>

<template>
  <div class="flex-row" style="gap: 0">
    <p class="stat-badge-title">{{ title }}</p>
    <p class="stat-badge-text">{{ text }}</p>
  </div>
</template>

<style>
.stat-badge-text {
  font-family: monospace;
  font-weight: bolder;
  font-size: small;
  align-self: center;
  background: slategray;
  color: white;
  padding: 0 8px;
  flex: 1;
}

.stat-badge-title {
  font-family: monospace;
  font-weight: bolder;
  font-size: small;
  align-self: center;
  background: white;
  color: black;
  padding: 0 8px;
  flex: 1;
}
</style>
