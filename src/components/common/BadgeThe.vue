<script setup lang="ts">
defineProps<{
  text: string
  color?: { type: string; default: 'white' }
}>()
</script>

<template>
  <p class="meta-badge">{{ text }}</p>
</template>

<style>
.meta-badge {
  font-family: monospace;
  font-weight: bolder;
  font-size: small;
  align-self: center;
  background: slategray;
  color: white;
  padding: 0 8px;
  border-left: 4px solid white;
}
</style>
