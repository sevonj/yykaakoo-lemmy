<script setup lang="ts">
import type { Community } from 'lemmy-js-client'

const props = defineProps<{
  comm: Community
}>()

function hostname(): string {
  return new URL(props.comm.actor_id).hostname
}
</script>

<template>
  <span class="meta"
    >!<span class="meta-highlight">{{ props.comm.name }}</span
    >@{{ hostname() }}</span
  >
</template>
