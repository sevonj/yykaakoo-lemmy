<script setup lang="ts">

import FeedSelector from '@/components/FeedSelector.vue';
import FeedSortBar from '@/components/FeedSortBar.vue';
import PostTile from '@/components/PostTile.vue';
import { LemmyHttp, type GetPosts, type PaginationCursor, type PostView, type SortType } from "lemmy-js-client";
import { getCurrentInstance, onMounted, ref, toRef, useTemplateRef } from 'vue';


const sortType = ref<SortType>("Active");
const feedLayout = ref<FeedLayoutType>("Grid");
const feedLocation = ref<FeedLocation>("Local");

function setSort(payload: { sortType: SortType }) {
  sortType.value = payload.sortType;
  resetFeed();
}

function setLayout(payload: { feedLayout: FeedLayoutType }) {
  feedLayout.value = payload.feedLayout;
}

function setFeedLocation(payload: { feedLocation: FeedLocation }) {
  feedLocation.value = payload.feedLocation;
  resetFeed();
}

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;

const posts = ref<PostView[]>([]);
let feedCursor: PaginationCursor | undefined = undefined;

let isFetchingMorePosts = false

function mapFeedLocation(getPostsForm: GetPosts): GetPosts {
  switch (feedLocation.value) {
    case "All":
      getPostsForm.type_ = "All"
      break;
    case "Local":
      getPostsForm.type_ = "Local"
      break;
    case "Subscribed":
      getPostsForm.type_ = "Subscribed"
      break;
  }
  return getPostsForm;
}

async function loadMorePosts() {
  if (isFetchingMorePosts) {
    return;
  }
  isFetchingMorePosts = true;

  const getPostsForm = mapFeedLocation({
    sort: sortType.value,
  });

  if (feedCursor) {
    getPostsForm.page_cursor = feedCursor;
  }

  console.log(getPostsForm);


  const response = await client.getPosts(getPostsForm);
  posts.value = posts.value.concat(response.posts);
  feedCursor = response.next_page;
  isFetchingMorePosts = false;
}

async function resetFeed() {
  posts.value = [];
  feedCursor = undefined;
  loadMorePosts();
}

const morePostsDetector = ref<HTMLElement | null>(null)

const onIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Element is in view!")
      loadMorePosts();
    }
  })
}

onMounted(() => {
  if (morePostsDetector.value) {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 })
    observer.observe(morePostsDetector.value)
  }
})


loadMorePosts();

</script>

<script lang="ts">
export type FeedLayoutType = "Grid" | "List";
export type FeedLocation = "All" | "Local" | "Subscribed";
</script>

<template>
  <FeedSelector :feed-location="toRef(feedLocation)" @changed="setFeedLocation" />
  <FeedSortBar :sort-type="toRef(sortType)" @changed="setSort" />
  <!--FeedActionsElevator :feed-layout="toRef(feedLayout)" @layout-changed="setLayout" /-->
  <main :class="feedLayout == 'Grid' ? 'feed-grid' : 'feed-list'">

    <PostTile v-for="postView in posts" :post-view="postView" :key="postView.post.id" :id="postView.post.id" />
    <a ref="morePostsDetector" class="more-posts-link" @click="loadMorePosts">Get more posts</a>

  </main>

  <div style="min-height: 100vh;"></div>

</template>


<style scoped>
main {
  display: grid;
  gap: .5rem;
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

.post-card {
  aspect-ratio: 3 / 2;
  aspect-ratio: 4 / 3;
  aspect-ratio: 1;
  aspect-ratio: 6 / 1;
}

.more-posts-link {
  text-align: center;
  aspect-ratio: 1;
}
</style>
