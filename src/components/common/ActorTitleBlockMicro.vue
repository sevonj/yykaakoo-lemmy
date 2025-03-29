<script setup lang="ts">
import { ServerIcon } from '@heroicons/vue/24/solid'
import AvatarMicro from './AvatarMicro.vue'

defineProps<{
  imgSrc?: string
  title: string
}>()
</script>

<template>
  <div class="actor-title-block-micro">
    <AvatarMicro :src="imgSrc">
      <ServerIcon v-if="!imgSrc" />
    </AvatarMicro>

    <h1>{{ title }}</h1>
  </div>
</template>

<style>
.actor-title-block-micro {
  display: flex;
  gap: 8px;
  max-width: 100%;
  overflow: hidden;
  align-items: center;
}

.actor-title-block-micro * {
  font-size: large;
  color: var(--color-text);
  font-weight: bold;
}
</style>
