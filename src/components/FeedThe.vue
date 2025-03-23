<script setup lang="ts">
import FeedNav from '@/components/FeedNav.vue'
import FeedSortBar from '@/components/FeedSortBar.vue'
import PostTile from '@/components/PostTile.vue'
import CommunityHeader from './headers/CommunityHeader.vue'

import {
  LemmyHttp,
  type GetCommunityResponse,
  type GetPosts,
  type PaginationCursor,
  type PostView,
  type SortType,
} from 'lemmy-js-client'
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue'

export type FeedLayoutType = 'Grid' | 'List'
export type FeedLocation =
  | { v: 'All' }
  | { v: 'Local' }
  | { v: 'Subscribed' }
  | { v: 'Community'; identifier: string; data: GetCommunityResponse }

type FeedState =
  | { v: 'Init' }
  | { v: 'Open'; cursor: PaginationCursor }
  | { v: 'Busy' }
  | { v: 'Ended' }

const props = defineProps<{
  feedLocation: FeedLocation
}>()

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const sortType = ref<SortType>('Active')
const feedLayout = ref<FeedLayoutType>('Grid')
const feedState = ref<FeedState>({ v: 'Init' })

const posts = ref<PostView[]>([])
const postRefs = ref<InstanceType<typeof PostTile>[]>([])
const expandedPostId = ref<number | null>()
const morePostsDetector = ref<HTMLElement | null>(null)

function setSort(payload: { sortType: SortType }) {
  sortType.value = payload.sortType
  resetFeed()
}

async function fetchMorePosts() {
  if (feedState.value.v != 'Open' && feedState.value.v != 'Init') {
    return
  }
  const page_cursor = feedState.value.v == 'Open' ? feedState.value.cursor : undefined
  feedState.value = { v: 'Busy' }

  const getPostsForm: GetPosts = {
    sort: sortType.value,
    page_cursor,
  }
  switch (props.feedLocation.v) {
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
      getPostsForm.community_name = props.feedLocation.identifier
      break
  }

  const response = await client.getPosts(getPostsForm)

  // fancy load effect
  for (const post of response.posts) {
    posts.value.push(post)
    await new Promise((resolve) => setTimeout(resolve, 40))
  }

  if (response.next_page) {
    feedState.value = { v: 'Open', cursor: response.next_page }
  } else {
    feedState.value = { v: 'Ended' }
  }

  // recurse
  if (!morePostsDetector.value) {
    return
  }
  const rect = morePostsDetector.value.getBoundingClientRect()
  if (rect.top < window.innerHeight) {
    fetchMorePosts()
  }
}

function resetFeed(): void {
  expandedPostId.value = null
  posts.value = []
  feedState.value = { v: 'Init' }
  fetchMorePosts()
}

function closeOpenedPost(): void {
  if (!expandedPostId.value) {
    return
  }
  const opened = postRefs.value.find((postTile) => postTile.postId === expandedPostId.value)
  expandedPostId.value = null
  if (!opened) {
    console.error('Got openedPostId but found no post?!')
  }
  opened?.closeComments()
}

function onPostOpened(postId: number): void {
  closeOpenedPost()
  expandedPostId.value = postId
}

function onScroll() {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight

  if (scrollTop + clientHeight >= scrollHeight - 400) {
    fetchMorePosts()
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(
  () => props.feedLocation,
  () => resetFeed(),
)

fetchMorePosts()
</script>

<template>
  <div class="feed-header">
    <FeedNav :location="toRef(feedLocation)" />
    <CommunityHeader v-if="feedLocation.v == 'Community'" :comm="feedLocation.data" />
  </div>

  <main>
    <div v-if="feedLocation.v == 'Subscribed'">
      <p>You are not logged in.</p>
    </div>
    <div v-else>
      <FeedSortBar :sort-type="toRef(sortType)" @changed="setSort" />

      <div v-if="expandedPostId" :key="expandedPostId" class="thread-close-elevator-cont">
        <div class="thread-close-elevator-subcont">
          <div class="thread-close-elevator" @click="closeOpenedPost()">
            <p>Close thread</p>
          </div>
        </div>
      </div>

      <div class="feed" :class="feedLayout == 'Grid' ? 'feed-grid' : 'feed-list'">
        <PostTile v-for="postView in posts" :post-view="postView" :key="postView.post.id" :id="postView.post.id"
          :feed-location="feedLocation" @opened="onPostOpened" ref="postRefs" class="pop-in" />
        <div ref="morePostsDetector">
          <p v-if="feedState.v == 'Ended'">You have reached the end.</p>
          <p v-else-if="feedState.v == 'Busy'">Loading...</p>
          <a v-else class="more-posts-link" @click="fetchMorePosts">Get more posts</a>
        </div>
      </div>
    </div>
    <div style="min-height: 300px"></div>
  </main>
</template>

<style>
.feed-header {
  padding: 0 8px 12px 8px;
  background: var(--color-background-soft);
}

.feed {
  display: grid;
  gap: 0.5rem;
  max-width: 1500px;
  max-width: 100vw;
  margin: auto;
  z-index: -1;
}

.feed-list {
  grid-template-columns: auto;
}

.feed-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.thread-close-elevator-cont {
  height: 0;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
  transform: translateZ(10);
}

.thread-close-elevator-subcont {
  float: right;
  width: 0;
}

.thread-close-elevator {
  background: #0009;
  position: relative;
  right: 64px;
  width: 64px;
  padding: 8px;
  cursor: pointer;
}

.thread-close-elevator:hover {
  color: white;
}

.more-posts-link {
  text-align: center;
  aspect-ratio: 1;
}
</style>
