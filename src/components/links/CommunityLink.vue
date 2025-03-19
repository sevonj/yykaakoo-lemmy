<script setup lang="ts">
import type { Community } from 'lemmy-js-client'

const props = defineProps<{
  community: Community
}>()

function hostname(): string {
  return new URL(props.community.actor_id).hostname
}

function identifier(): string {
  return `!${props.community.name}@${new URL(props.community.actor_id).hostname}`
}
</script>

<template>
  <RouterLink :to="identifier()" class="meta"
    ><span class="meta-highlight">!{{ props.community.name }}</span
    >@{{ hostname() }}</RouterLink
  >
</template>
