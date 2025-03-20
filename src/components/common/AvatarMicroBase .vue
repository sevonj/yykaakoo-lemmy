<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <div class="avatar avatar-micro">
    <img v-if="src" :src />
    <slot></slot>
  </div>
</template>

<style>
.avatar-micro {
  width: 32px;
  height: 32px;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
}
</style>
