<script setup lang="ts">
import type { Person } from 'lemmy-js-client'

const props = defineProps<{
  person: Person
}>()

function hostname(): string {
  return new URL(props.person.actor_id).hostname
}
</script>

<template>
  <span class="meta"
    >@<span class="meta-highlight">{{ props.person.name }}</span
    >@{{ hostname() }}</span
  >
</template>
