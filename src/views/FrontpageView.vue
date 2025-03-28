<script setup lang="ts">
import FeedThe, { type FeedLocation } from '@/components/FeedThe.vue'
import FeedNav from '@/components/FeedNav.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { toRef } from 'vue'

const route = useRoute()

let feedLocation = buildFeedLocation(listingType())

function listingType(): string | undefined {
  return route.query.listingType?.toString()
}

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

watch(
  () => route.query.listingType,
  (newListingType) => {
    feedLocation = buildFeedLocation(newListingType?.toString())
  },
)
</script>

<template>
  <div v-if="feedLocation">
    <header>
      <FeedNav :location="toRef(feedLocation)" />
    </header>
    <FeedThe :feed-location />
  </div>
</template>

<style></style>
