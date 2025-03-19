<script setup lang="ts">
import type { FeedLocation } from './FeedComponent.vue'
import { type Ref } from 'vue'

defineProps<{
  location: Ref<FeedLocation, FeedLocation>
}>()

defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changed(payload: { feedLocation: FeedLocation }) {
    return true
  },
})
</script>

<template>
  <div class="feed-nav">
    <div class="feed-nav-link-cont">
      <RouterLink
        to="/?listingType=All"
        class="feed-nav-link"
        @click="$emit('changed', { feedLocation: { type: 'All' } })"
        :class="location.value.type == 'All' ? 'feed-nav-link-selected' : ''"
        >All</RouterLink
      >

      <RouterLink
        to="/?listingType=Local"
        class="feed-nav-link"
        @click="$emit('changed', { feedLocation: { type: 'Local' } })"
        :class="location.value.type == 'Local' ? 'feed-nav-link-selected' : ''"
        >Local</RouterLink
      >

      <RouterLink
        to="/?listingType=Subscribed"
        class="feed-nav-link"
        @click="$emit('changed', { feedLocation: { type: 'Subscribed' } })"
        :class="location.value.type == 'Subscribed' ? 'feed-nav-link-selected' : ''"
        >Followed</RouterLink
      >

      <a
        class="feed-nav-link"
        :class="location.value.type == 'Community' ? 'feed-nav-link-selected' : ''"
        >Communities</a
      >
    </div>
  </div>
</template>

<style>
.feed-nav {
  margin-bottom: 16px;
}

.feed-nav-link-cont {
  display: flex;
  gap: 8px;
  align-items: end;
  flex-wrap: wrap;
}

.feed-nav-link {
  font-size: x-large;
  text-decoration: none;
}

.feed-nav-link-selected {
  font-weight: bold;
  color: white;
}

.feed-nav-commid {
  font-size: large;
  margin-bottom: 4px;
}
</style>
