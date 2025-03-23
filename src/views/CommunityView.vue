<script setup lang="ts">
import FeedThe, { type FeedLocation } from '@/components/FeedThe.vue'
import { communityRequestIdentifier } from '@/lib/actors'
import type { GetCommunity, LemmyHttp } from 'lemmy-js-client'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

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
  <FeedThe v-if="feedLocation" :feed-location />
</template>

<style></style>
