<script setup lang="ts">
import type { Person } from 'lemmy-js-client'
import UserHandle from '../textformat/UserHandle.vue'

const props = defineProps<{
  person: Person
}>()

function hostname(): string {
  return new URL(props.person.actor_id).hostname
}

function identifier(): string {
  return `@${props.person.name}@${hostname()}`
}
</script>

<template>
  <RouterLink class="meta" :to="identifier()">
    <UserHandle :person />
  </RouterLink>
</template>
