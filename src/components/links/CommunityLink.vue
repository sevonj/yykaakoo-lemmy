<script setup lang="ts">
import type { Community } from 'lemmy-js-client'
import CommunityHandle from '../textformat/CommunityHandle.vue'
import { communityIdentifier } from '@/lib/actors'

const props = defineProps<{
  comm: Community
}>()

const identifier = communityIdentifier(props.comm)
</script>

<template>
  <RouterLink class="meta" :to="identifier">
    <CommunityHandle :comm />
  </RouterLink>
</template>
