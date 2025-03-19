<script setup lang="ts">
import FeedNav from '@/components/FeedNav.vue'
import FeedSortBar from '@/components/FeedSortBar.vue'
import PostTile from '@/components/PostTile.vue'
import {
  LemmyHttp,
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

const sortType = ref<SortType>('Active')
const feedLayout = ref<FeedLayoutType>('Grid')
const feedLocation = ref<FeedLocation>(generateFeedLocation())

watch(
  () => route.query.listingType,
  (newValue) => {
    listingType = newValue?.toString()
    feedLocation.value = generateFeedLocation()
    resetFeed()
  },
)
watch(
  () => route.params.communityIdentifier,
  (newValue) => {
    identifier = newValue?.toString()
    feedLocation.value = generateFeedLocation()
    resetFeed()
  },
)

function setSort(payload: { sortType: SortType }) {
  sortType.value = payload.sortType
  resetFeed()
}

//function setLayout(payload: { feedLayout: FeedLayoutType }) {
//  feedLayout.value = payload.feedLayout;
//}

function setFeedLocation(payload: { feedLocation: FeedLocation }): void {
  //feedLocation.value = payload.feedLocation
  //resetFeed()
}

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const posts = ref<PostView[]>([])
let feedCursor: PaginationCursor | undefined = undefined

let isFetchingMorePosts = false

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
  if (isFetchingMorePosts) {
    return
  }
  isFetchingMorePosts = true

  const getPostsForm = mapFeedLocation({
    sort: sortType.value,
  })

  if (feedCursor) {
    getPostsForm.page_cursor = feedCursor
  }

  console.log(getPostsForm)

  const response = await client.getPosts(getPostsForm)
  posts.value = posts.value.concat(response.posts)
  feedCursor = response.next_page
  isFetchingMorePosts = false
}

async function resetFeed() {
  posts.value = []
  feedCursor = undefined
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
  <div style="padding: 0px 8px">
    <FeedNav :location="toRef(feedLocation)" @changed="setFeedLocation" />
    <slot name="locationHeader"></slot>
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
        <a ref="morePostsDetector" class="more-posts-link" @click="loadMorePosts">Get more posts</a>
      </div>
    </div>
    <div style="min-height: 100vh"></div>
  </main>
</template>

<style>
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
