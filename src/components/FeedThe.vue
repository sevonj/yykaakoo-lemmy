<script setup lang="ts">
import FeedNav from '@/components/FeedNav.vue'
import FeedSortBar from '@/components/FeedSortBar.vue'
import PostTile from '@/components/PostTile.vue'
import CommunityHeader from './headers/CommunityHeader.vue'

import {
  LemmyHttp,
  type GetCommunity,
  type GetCommunityResponse,
  type GetPosts,
  type PaginationCursor,
  type PostView,
  type SortType,
} from 'lemmy-js-client'
import { getCurrentInstance, onMounted, ref, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let identifier = route.params.identifier?.toString()
let listingType = route.query.listingType?.toString()
const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client
const posts = ref<PostView[]>([])
let feedCursor: PaginationCursor | undefined = undefined
let feedEnded = false
let isFetchingMorePosts = false
const sortType = ref<SortType>('Active')
const feedLayout = ref<FeedLayoutType>('Grid')
const feedLocation = ref<FeedLocation>(generateFeedLocation())
let comm = await fetchComm()

function generateFeedLocation(): FeedLocation {
  if (identifier) {
    return { type: 'Community', identifier }
  }
  if (listingType) {
    switch (listingType) {
      case 'All':
        return { type: 'All' }
      case 'Local':
        return { type: 'Local' }
      case 'Subscribed':
        return { type: 'Subscribed' }
    }
  }
  return { type: 'Local' }
}

async function fetchComm(): Promise<GetCommunityResponse | null> {
  if (!identifier) {
    return null
  }
  const getCommunityForm: GetCommunity = {
    name: identifier,
  }
  return await client.getCommunity(getCommunityForm)
}

watch(
  () => route.query.listingType,
  (newValue) => {
    listingType = newValue?.toString()
    feedLocation.value = generateFeedLocation()
    resetFeed()
  },
)

watch(
  () => route.params.identifier,
  async (newValue) => {
    identifier = newValue?.toString()
    feedLocation.value = generateFeedLocation()
    comm = await fetchComm()
    resetFeed()
  },
)

function setSort(payload: { sortType: SortType }) {
  sortType.value = payload.sortType
  resetFeed()
}

function mapFeedLocation(getPostsForm: GetPosts): GetPosts {
  switch (feedLocation.value.type) {
    case 'All':
      getPostsForm.type_ = 'All'
      break
    case 'Local':
      getPostsForm.type_ = 'Local'
      break
    case 'Subscribed':
      getPostsForm.type_ = 'Subscribed'
      break
    case 'Community':
      getPostsForm.community_name = feedLocation.value.identifier
      break
  }
  return getPostsForm
}

async function loadMorePosts() {
  if (isFetchingMorePosts || feedEnded) {
    return
  }
  isFetchingMorePosts = true

  const getPostsForm = mapFeedLocation({
    sort: sortType.value,
  })

  if (feedCursor) {
    getPostsForm.page_cursor = feedCursor
  }

  const response = await client.getPosts(getPostsForm)
  posts.value = posts.value.concat(response.posts)
  feedCursor = response.next_page
  isFetchingMorePosts = false
  console.log('CURSOR: ', response.next_page)
  if (!response.next_page) {
    feedEnded = true
  }
}

async function resetFeed(): Promise<void> {
  posts.value = []
  feedCursor = undefined
  feedEnded = false
  loadMorePosts()
}

const morePostsDetector = ref<HTMLElement | null>(null)

const onIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMorePosts()
    }
  })
}

onMounted(() => {
  if (morePostsDetector.value) {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 })
    observer.observe(morePostsDetector.value)
  }
})

loadMorePosts()
</script>

<script lang="ts">
export type FeedLayoutType = 'Grid' | 'List'
export type FeedLocation =
  | { type: 'All' }
  | { type: 'Local' }
  | { type: 'Subscribed' }
  | { type: 'Community'; identifier: string }
</script>

<template>
  <div class="feed-header">
    <FeedNav :location="toRef(feedLocation)" />
    <CommunityHeader v-if="comm" :comm :identifier />
  </div>

  <main>
    <div v-if="feedLocation.type == 'Subscribed'">
      <p>You are not logged in.</p>
    </div>
    <div v-else>
      <FeedSortBar :sort-type="toRef(sortType)" @changed="setSort" />
      <div class="feed" :class="feedLayout == 'Grid' ? 'feed-grid' : 'feed-list'">
        <PostTile
          v-for="postView in posts"
          :post-view="postView"
          :key="postView.post.id"
          :id="postView.post.id"
          :feed-location="feedLocation"
        />
        <div ref="morePostsDetector">
          <p v-if="feedEnded">You have reached the end.</p>
          <p v-else-if="isFetchingMorePosts">Loading...</p>
          <a v-else class="more-posts-link" @click="loadMorePosts">Get more posts</a>
        </div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div style="min-height: 100vh"></div>
  </main>
</template>

<style>
.feed-header {
  padding: 8px 0 12px 8px;
  background: var(--color-background-soft);
}

.feed {
  display: grid;
  gap: 0.5rem;
  max-width: 1500px;
  max-width: 100vw;
  margin: auto;
}

.feed-list {
  grid-template-columns: auto;
}

.feed-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.more-posts-link {
  text-align: center;
  aspect-ratio: 1;
}
</style>
