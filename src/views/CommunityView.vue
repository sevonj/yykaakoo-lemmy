<script setup lang="ts">
import FeedThe, { type FeedLocation } from '@/components/FeedThe.vue'
import FeedNav from '@/components/FeedNav.vue'
import CommunityHeader from '@/components/headers/CommunityHeader.vue'
import { communityRequestIdentifier } from '@/lib/actors'
import type { GetCommunity, LemmyHttp } from 'lemmy-js-client'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toRef } from 'vue'

const route = useRoute()
const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const feedLocation = ref<FeedLocation | undefined>()

async function fetchFeedLocation() {
  feedLocation.value = await buildFeedLocation(route.params.communityIdentifier.toString())
}

async function buildFeedLocation(param: string): Promise<FeedLocation> {
  const getCommunityForm: GetCommunity = {
    name: param,
  }
  const data = await client.getCommunity(getCommunityForm)
  const identifier = communityRequestIdentifier(data.community_view.community)

  return { v: 'Community', identifier, data }
}

watch(
  () => route.query.communityIdentifier,
  async (newIdentifier) => {
    feedLocation.value = await buildFeedLocation(newIdentifier as string)
  },
)

fetchFeedLocation()
</script>

<template>
  <div v-if="feedLocation">
    <div class="feed-header">
      <FeedNav :location="toRef(feedLocation)" />
      <CommunityHeader v-if="feedLocation.v == 'Community'" :comm="feedLocation.data" />
    </div>
    <FeedThe :feed-location />
  </div>
</template>

<style>
.feed-header {
  padding: 0 8px 12px 8px;
  background: var(--color-background-soft);
}
</style>
