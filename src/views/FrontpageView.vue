<script setup lang="ts">
import FeedThe, { type FeedLocation } from '@/components/FeedThe.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const feedLocation = ref(buildFeedLocation(listingType()))

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
    feedLocation.value = buildFeedLocation(newListingType?.toString())
  },
)
</script>

<template>
  <FeedThe :feed-location />
</template>

<style></style>
