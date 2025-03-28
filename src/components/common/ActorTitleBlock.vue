<script setup lang="ts">
import { ServerIcon } from '@heroicons/vue/24/solid'
import AvatarMini from './AvatarMini.vue'

defineProps<{
  imgSrc?: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="actor-title-block">
    <AvatarMini :src="imgSrc" class="actor-title-block-avatar">
      <ServerIcon v-if="!imgSrc" />
    </AvatarMini>

    <div class="actor-title-block-title">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<style>
.actor-title-block {
  display: flex;
  gap: 16px;
  max-width: 100%;
  overflow: hidden;
}

.actor-title-block-title * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actor-title-block-title h1 {
  color: #fafafa;
  line-height: 1.4em;
  font-weight: bold;
}
</style>
