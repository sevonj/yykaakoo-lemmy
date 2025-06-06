<script setup lang="ts">
import CommunityMiniCard from './CommunityMiniCard.vue'

import {
  type CommunityView,
  type GetSiteResponse,
  LemmyHttp,
  type ListCommunities,
  type ListingType,
  type Search,
} from 'lemmy-js-client'
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export type CommunityLocation = 'All' | 'Local' | 'Subscribed' | 'ModeratorView' | 'Search'

const appInstance = getCurrentInstance()
const client: LemmyHttp = appInstance?.appContext.config.globalProperties.$client
const site: Ref<GetSiteResponse> = appInstance?.appContext.config.globalProperties.$localSite

const location = ref<CommunityLocation>('All')
let page = 0
const limit = 50
const communities = ref<CommunityView[]>([])
let fetchingMoreCommunities = false
let endReached = false
const searchQuery = ref<string>('')
const moreCommsDetector = ref<HTMLElement | null>(null)

function mapLocation(location: CommunityLocation): ListingType | undefined {
  switch (location) {
    case 'All':
      return 'All'
    case 'Local':
      return 'Local'
    case 'Subscribed':
      return 'Subscribed'
    case 'ModeratorView':
      return 'ModeratorView'
  }
}

function fetchCommunities(): void {
  page = 0
  endReached = false
  communities.value = []

  if (location.value == 'Search') {
    return
  }

  fetchMoreCommunities()
}

function searchComms(): void {
  page = 0
  endReached = false
  communities.value = []

  fetchMoreCommunities()
}

async function fetchMoreCommunities(): Promise<void> {
  if (endReached || fetchingMoreCommunities) {
    return
  }
  fetchingMoreCommunities = true
  page += 1

  const result = await (location.value == 'Search' ? fetchBySearch() : fetchByList())
  if (result.length == 0) {
    endReached = true
  }
  communities.value = communities.value.concat(result)
  fetchingMoreCommunities = false

  // recurse
  if (!moreCommsDetector.value) {
    console.error('detektor didnt exist')
    return
  }
  const rect = moreCommsDetector.value.getBoundingClientRect()
  if (rect.top < window.innerHeight) {
    fetchMoreCommunities()
  }
}

async function fetchByList(): Promise<CommunityView[]> {
  const form: ListCommunities = {
    type_: mapLocation(location.value),
    sort: 'NewComments',
    page,
    limit,
    show_nsfw: false,
  }

  const result = await client.listCommunities(form)
  return result.communities
}

async function fetchBySearch(): Promise<CommunityView[]> {
  const form: Search = {
    q: searchQuery.value,
    sort: 'NewComments',
    listing_type: 'All',
    page,
    limit,
  }

  const result = await client.search(form)
  return result.communities
}

function onScroll(): void {
  if (!moreCommsDetector.value) {
    return
  }
  const rect = moreCommsDetector.value.getBoundingClientRect()
  if (rect.top < window.innerHeight) {
    fetchMoreCommunities()
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

fetchCommunities()
</script>

<template>
  <div class="comm-browser">
    <form class="comm-browser-tabs nav" @change="fetchCommunities">
      <input type="radio" class="hide" id="All" value="All" v-model="location" />
      <label for="All">Everywhere</label>

      <input type="radio" class="hide" id="Local" value="Local" v-model="location" />
      <label for="Local">Local</label>

      <input type="radio" class="hide" id="Subscribed" value="Subscribed" v-model="location" />
      <label for="Subscribed">Subscribed</label>

      <input type="radio" class="hide" id="Search" value="Search" v-model="location" />
      <label for="Search">Search</label>
    </form>

    <div class="search" :class="location != 'Search' ? 'hide' : ''">
      <form onsubmit="return false;" @submit="searchComms">
        <input type="search" v-model="searchQuery" />
        <button>Search</button>
      </form>
    </div>

    <div v-if="(location == 'Subscribed' || location == 'ModeratorView') && !site.my_user">
      <p>You are not logged in.</p>
    </div>
    <div class="comm-browser-grid" v-else>
      <CommunityMiniCard v-for="comm in communities" :comm :key="comm.community.id" />
      <div
        class="comm-browser-more-item"
        v-if="!fetchingMoreCommunities && !endReached && page > 0"
      >
        <a @click="fetchMoreCommunities">More</a>
      </div>
    </div>
    <div ref="moreCommsDetector"></div>
  </div>
</template>

<style>
.comm-browser {
  margin-bottom: 32px;
}

.comm-browser-tabs {
  display: flex;
  gap: 8px;
  padding: 8px 0;
}

.search {
  margin-bottom: 4px;
}

.comm-browser-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3px;
}

.comm-browser-more-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-border);
}
</style>
