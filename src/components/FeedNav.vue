<script setup lang="ts">
import type { FeedLocation } from './FeedThe.vue'
import { type Ref } from 'vue'

defineProps<{
  location: Ref<FeedLocation, FeedLocation>
}>()

</script>

<template>
  <div class="feed-nav">
    <div class="feed-nav-link-cont">
      <RouterLink to="/?listingType=All" class="feed-nav-link"
        :class="location.value.type == 'All' ? 'feed-nav-link-selected' : ''">All</RouterLink>

      <RouterLink to="/?listingType=Local" class="feed-nav-link"
        :class="location.value.type == 'Local' ? 'feed-nav-link-selected' : ''">Local</RouterLink>

      <RouterLink to="/?listingType=Subscribed" class="feed-nav-link"
        :class="location.value.type == 'Subscribed' ? 'feed-nav-link-selected' : ''">Followed</RouterLink>

      <a class="feed-nav-link"
        :class="location.value.type == 'Community' ? 'feed-nav-link-selected' : ''">Communities</a>
    </div>
  </div>
</template>

<style>
.feed-nav {}

.feed-nav-link-cont {
  display: flex;
  gap: 8px;
  align-items: end;
  flex-wrap: wrap;
}

.feed-nav-link {
  font-size: large;
  text-decoration: none;
  color: var(--color-navlink);
}

.feed-nav-link-selected {
  font-weight: bold;
  color: var(--color-navlink-active);
}

.feed-nav-commid {
  font-size: large;
  margin-bottom: 4px;
}
</style>
