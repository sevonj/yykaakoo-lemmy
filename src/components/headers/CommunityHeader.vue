<script setup lang="ts">
import type { GetCommunityResponse } from 'lemmy-js-client'

defineProps<{
  comm: GetCommunityResponse
  identifier?: string
}>()
</script>

<template>
  <div class="community-title">
    <img v-if="comm.community_view.community.icon" :src="comm.community_view.community.icon" />
  </div>
</template>

<style>
.community-title {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
