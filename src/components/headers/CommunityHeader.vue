<script setup lang="ts">
import type { GetCommunityResponse } from 'lemmy-js-client';


defineProps<{
  comm: GetCommunityResponse,
  identifier?: string,
}>();



</script>

<template>
  <div class="community-title">
    <RouterLink to="/"> Back </RouterLink>
    <h1>{{ identifier }}</h1>
  </div>
</template>

<style>
.community-title {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
