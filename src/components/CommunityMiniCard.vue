<script setup lang="ts">
import type { CommunityView } from 'lemmy-js-client'
import AvatarNormal from './common/AvatarNormal.vue'
import CommunityHandle from './textformat/CommunityHandle.vue'
import { communityIdentifier } from '@/lib/actors'
import { Squares2X2Icon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  comm: CommunityView
}>()

const identifier = communityIdentifier(props.comm.community)
</script>

<template>
  <RouterLink :to="identifier" class="comm-minicard-cont meta-link">
    <div>
      <AvatarNormal :src="comm.community.icon">
        <Squares2X2Icon />
      </AvatarNormal>
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
