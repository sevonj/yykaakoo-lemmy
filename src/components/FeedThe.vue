<script setup lang="ts">
import FeedSortBar from '@/components/FeedSortBar.vue'
import PostTile from '@/components/PostTile.vue'

import {
  LemmyHttp,
  type GetCommunityResponse,
  type GetPersonDetails,
  type GetPersonDetailsResponse,
  type GetPosts,
  type GetPostsResponse,
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
  | { v: 'Person'; id: number }

type FeedState =
  | { v: 'Init' }
  | { v: 'Open'; cursor: PaginationCursor }
  | { v: 'Busy' }
  | { v: 'Ended' }

type FeedForm = { v: 'Posts'; form: GetPosts } | { v: 'Person'; form: GetPersonDetails }

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

  let form: FeedForm | undefined

  switch (props.feedLocation.v) {
    case 'All':
      form = {
        v: 'Posts',
        form: {
          type_: 'All',
          page_cursor,
        },
      }
      break
    case 'Local':
      form = {
        v: 'Posts',
        form: {
          type_: 'Local',
          page_cursor,
        },
      }
      break
    case 'Subscribed':
      form = {
        v: 'Posts',
        form: {
          type_: 'Subscribed',
          page_cursor,
        },
      }
      break
    case 'Community':
      form = {
        v: 'Posts',
        form: {
          community_name: props.feedLocation.identifier,
          page_cursor,
        },
      }
      break
    case 'Person':
      const page = Number(page_cursor)
      form = {
        v: 'Person',
        form: {
          person_id: props.feedLocation.id,
          page: isNaN(page) ? undefined : page,
        },
      }
  }

  let response: GetPostsResponse | GetPersonDetailsResponse | undefined
  let next_page: string | undefined

  switch (form.v) {
    case 'Posts':
      response = await client.getPosts(form.form)
      next_page = response.next_page
      break
    case 'Person':
      response = await client.getPersonDetails(form.form)
      if (response.posts.length > 0) {
        next_page = (Number(page_cursor) + 1).toString()
      }
      break
  }

  // fancy load effect
  for (const post of response.posts) {
    posts.value.push(post)
    await new Promise((resolve) => setTimeout(resolve, 40))
  }

  if (next_page) {
    feedState.value = { v: 'Open', cursor: next_page }
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
        <PostTile
          v-for="postView in posts"
          :post-view="postView"
          :key="postView.post.id"
          :id="postView.post.id"
          :show-comm="feedLocation.v != 'Community'"
          @opened="onPostOpened"
          ref="postRefs"
          class="pop-in"
        />
        <div ref="morePostsDetector">
          <p v-if="feedState.v == 'Ended'">You have reached the end.</p>
          <p v-else-if="feedState.v == 'Busy'">Loading...</p>
          <a v-else class="more-posts-link" @click="fetchMorePosts">Get more posts</a>
        </div>
        <div style="min-height: 300px; grid-column: 1/-1"></div>
      </div>
    </div>
  </main>
</template>

<style>
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
