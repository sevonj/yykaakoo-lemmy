<script setup lang="ts">
import FeedThe, { type FeedLocation } from '@/components/FeedThe.vue'
import FeedNav from '@/components/FeedNav.vue'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toRef } from 'vue'

const route = useRoute()
const router = useRouter()

let feedLocation: FeedLocation | undefined

function buildFeedLocation(listingType?: string): FeedLocation {
  if (listingType) {
    switch (listingType) {
      case 'All':
        return { v: 'All' }
      case 'Local':
        return { v: 'Local' }
      case 'Subscribed':
        return { v: 'Subscribed' }
    }
  }
  return { v: 'Local' }
}

function updateFeedLocation(listingType?: string): void {
  if (!listingType) {
    listingType = route.query.listingType?.toString()
  }
  if (!listingType) {
    listingType = 'Local'
  }
  if (listingType != route.query.listingType) {
    router.push({ query: { listingType: listingType } })
    // Return bc this will be immediately called again by the watcher.
    return
  }
  feedLocation = buildFeedLocation(listingType?.toString())
}

watch(
  () => route.query.listingType,
  (listingType) => {
    updateFeedLocation(listingType?.toString())
  },
)

updateFeedLocation()
</script>

<template>
  <div v-if="feedLocation">
    <header>
      <FeedNav :location="toRef(feedLocation)" ref="feed" />
    </header>
    <FeedThe :feed-location />
  </div>
</template>

<style></style>
