<script setup lang="ts">
import type { CommunityView } from 'lemmy-js-client'
import AvatarMiniBase from './common/AvatarMiniBase.vue'
import AvatarMiniPlaceholder from './common/AvatarMiniPlaceholder.vue'
import CommunityHandle from './textformat/CommunityHandle.vue'

const props = defineProps<{
  comm: CommunityView
}>()

function hostname(): string {
  return new URL(props.comm.community.actor_id).hostname
}

function identifier(): string {
  return `!${props.comm.community.name}@${hostname()}`
}
</script>

<template>
  <RouterLink :to="identifier()" class="comm-minicard-cont meta-link">
    <div>
      <AvatarMiniBase v-if="comm.community.icon" :src="comm.community.icon" />
      <AvatarMiniPlaceholder v-else />
    </div>

    <div class="comm-minicard-details">
      <p class="metaline">
        <CommunityHandle :comm="comm.community" />
      </p>
      <p class="meta">
        Subscribers: {{ comm.counts.subscribers }} • Posts: {{ comm.counts.posts }}
      </p>
    </div>
  </RouterLink>
</template>

<style>
.comm-minicard-cont {
  display: flex;
  gap: 4px;
}

.comm-minicard-details {
  max-width: calc(100% - 64px);
}

.metaline {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
