<script setup lang="ts">
import type { Person } from 'lemmy-js-client'
import UserHandle from '../textformat/UserHandle.vue'
import { personIdentifier } from '@/lib/actors'

const props = defineProps<{
  person: Person
}>()

const identifier = personIdentifier(props.person)
</script>

<template>
  <RouterLink class="meta" :to="identifier">
    <UserHandle :person />
  </RouterLink>
</template>
