<script setup lang="ts">
import type { Community } from 'lemmy-js-client'
import CommunityHandle from '../textformat/CommunityHandle.vue'

const props = defineProps<{
  comm: Community
}>()

function hostname(): string {
  return new URL(props.comm.actor_id).hostname
}

function identifier(): string {
  return `!${props.comm.name}@${hostname()}`
}
</script>

<template>
  <RouterLink class="meta" :to="identifier()">
    <CommunityHandle :comm />
  </RouterLink>
</template>
