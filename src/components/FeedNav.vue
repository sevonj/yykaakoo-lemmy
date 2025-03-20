<script setup lang="ts">
import { useRoute } from 'vue-router'
import CommunityBrowser from './CommunityBrowser.vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'

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
    <div class="feed-nav-link-cont" v-if="!showCommBrowser">
      <RouterLink
        to="/?listingType=All"
        class="feed-nav-link"
        :class="location.value.type == 'All' ? 'feed-nav-link-selected' : ''"
        >All</RouterLink
      >

      <RouterLink
        to="/?listingType=Local"
        class="feed-nav-link"
        :class="location.value.type == 'Local' ? 'feed-nav-link-selected' : ''"
        >Local</RouterLink
      >

      <RouterLink
        to="/?listingType=Subscribed"
        class="feed-nav-link"
        :class="location.value.type == 'Subscribed' ? 'feed-nav-link-selected' : ''"
        >Followed</RouterLink
      >

      <a
        class="feed-nav-link"
        :class="location.value.type == 'Community' ? 'feed-nav-link-selected' : ''"
        @click="toggleCommBrowser"
        >Communities</a
      >
    </div>
    <div v-else class="flex-row meta-link" style="align-items: center" @click="toggleCommBrowser">
      <XMarkIcon style="max-height: 2.6em" class="meta-icon" />
      <h1 class="nav-active">Communities</h1>
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
