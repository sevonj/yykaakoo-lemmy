<script setup lang="ts">
import { useRoute } from 'vue-router'
import CommunityBrowser from './CommunityBrowser.vue'

import type { FeedLocation } from './FeedThe.vue'
import { ref, watch, type Ref } from 'vue'

defineProps<{
  location: Ref<FeedLocation, FeedLocation>
}>()

const route = useRoute()
const showCommBrowser = ref(false)

function toggleCommBrowser(): void {
  showCommBrowser.value = !showCommBrowser.value
}

watch(
  () => route.fullPath,
  () => {
    showCommBrowser.value = false
  },
)
</script>

<template>
  <div class="feed-nav">
    <div class="feed-nav-link-cont">
      <RouterLink
        to="/?listingType=All"
        class="nav"
        :class="location.value.type == 'All' ? 'selected feed-nav-link-selected' : ''"
        >All</RouterLink
      >

      <RouterLink
        to="/?listingType=Local"
        class="nav"
        :class="location.value.type == 'Local' ? 'selected feed-nav-link-selected' : ''"
        >Local</RouterLink
      >

      <RouterLink
        to="/?listingType=Subscribed"
        class="nav"
        :class="location.value.type == 'Subscribed' ? 'selected feed-nav-link-selected' : ''"
        >Followed</RouterLink
      >

      <a
        class="nav"
        :class="{
          selected: location.value.type == 'Community',
          'feed-nav-link-selected': location.value.type == 'Community',
          'pseudo-active': showCommBrowser,
        }"
        @click="toggleCommBrowser"
        >Communities</a
      >
    </div>

    <Suspense>
      <CommunityBrowser @comm_opened="showCommBrowser = false" v-if="showCommBrowser" />
    </Suspense>
  </div>
</template>

<style>
.feed-nav {
}

.feed-nav-link-cont {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  font-size: large;
}

.feed-nav-commid {
  font-size: large;
  margin-bottom: 4px;
}
</style>
