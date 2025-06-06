<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="avatar avatar-normal">
    <img v-if="src" :src />
    <slot></slot>
  </div>
</template>

<style>
.avatar-normal {
  width: 48px;
  height: 48px;
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
}
</style>
