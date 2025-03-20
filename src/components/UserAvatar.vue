<script setup lang="ts">
import type { Person } from 'lemmy-js-client'
import { UserIcon } from '@heroicons/vue/24/solid'

defineProps<{
  person: Person
}>()
</script>

<template>
  <div class="user-avatar">
    <img v-if="person.avatar" :src="person.avatar" />
    <UserIcon v-else class="user-avatar-placeholder" />
  </div>
</template>

<style>
.user-avatar {
  width: 32px;
  aspect-ratio: 1;
  min-width: 32px;
  background: orangered;
  overflow: hidden;
  border: 1px solid #444;
}

.user-avatar-placeholder {
  color: #ffffff4f;
  width: 120%;
  position: relative;
  left: -10%;
  aspect-ratio: 1;
  object-fit: cover;
}

.user-avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
