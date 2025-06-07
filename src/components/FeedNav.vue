<script setup lang="ts">
import { useRoute } from 'vue-router'
import CommunityBrowser from './CommunityBrowser.vue'
import TabSelector from './TabSelector.vue'

import type { FeedLocation } from './FeedThe.vue'
import { ref, watch, type Ref } from 'vue'

const route = useRoute()

defineProps<{
  location: Ref<FeedLocation, FeedLocation>
}>()

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
  <div>
    <TabSelector
      class="large"
      :tabs="[
        {
          routeName: 'browse_frontpage',
          targetPath: '/',
          query: { key: 'listingType', val: 'All', isDefault: true },
          label: 'All',
        },
        {
          routeName: 'browse_frontpage',
          targetPath: '/',
          query: { key: 'listingType', val: 'Local' },
          label: 'Local',
        },
        {
          routeName: 'browse_frontpage',
          targetPath: '/',
          query: { key: 'listingType', val: 'Subscribed' },
          label: 'Followed',
        },
        {
          routeName: 'browse_community',
          label: 'Communities',
          callback: toggleCommBrowser,
          highlight: showCommBrowser,
        },
      ]"
    />

    <Suspense>
      <CommunityBrowser v-if="showCommBrowser" />
    </Suspense>
  </div>
</template>
