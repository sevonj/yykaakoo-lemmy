<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="avatar avatar-large">
    <img v-if="src" :src />
    <slot></slot>
  </div>
</template>

<style>
.avatar-large {
  width: 64px;
  height: 64px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-height: 64px;
}
</style>
