<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="avatar avatar-mini">
    <img v-if="src" :src />
    <slot></slot>
  </div>
</template>

<style>
.avatar-mini {
  width: 36px;
  height: 36px;
  min-width: 36px;
  max-width: 36px;
  min-height: 36px;
  max-height: 36px;
}
</style>
