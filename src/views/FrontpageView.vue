<script setup lang="ts">

import FeedActionsElevator from '@/components/FeedActionsElevator.vue';
import FeedSortBar from '@/components/FeedSortBar.vue';
import PostTile from '@/components/PostTile.vue';
import { LemmyHttp, type GetPosts, type PaginationCursor, type PostView, type SortType } from "lemmy-js-client";
import { getCurrentInstance, ref, useTemplateRef } from 'vue';

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;

const posts = ref<PostView[]>([]);
let feed_cursor: PaginationCursor | undefined = undefined;
const sortType = ref<SortType>("Active");
let openedPost: number | null = null;
const postRefs = useTemplateRef('posts');

function closePost() {
  if (!openedPost || !postRefs.value) {
    return
  }
  postRefs.value.find(comp => comp?.postView.post.id == openedPost)?.closeComments();
}

function onPostOpen(post_id: number) {
  closePost()
  openedPost = post_id;
}

async function extendFeed() {
  const getPostsForm: GetPosts = {
    sort: sortType.value,
    type_: "All",
    page_cursor: feed_cursor,
  };

  let response = await client.getPosts(getPostsForm);
  posts.value = posts.value.concat(response.posts);
  feed_cursor = response.next_page;
  console.log("new cursor: ", feed_cursor, posts.value.length);
}

async function resetFeed() {
  posts.value = [];
  feed_cursor = undefined;
  extendFeed();
}

function set_sort(payload: { sortType: SortType }) {
  sortType.value = payload.sortType;
  resetFeed();
}

extendFeed();

</script>

<template>
  <FeedSortBar @changed="set_sort" />
  <main>
    <FeedActionsElevator />
    <a @click="closePost">closePost</a>

    <PostTile v-for="postView in posts" :post-view="postView" :key="postView.post.id" ref="posts"
      @opened="onPostOpen" />

  </main>

  <a @click="extendFeed">Get more posts</a>


</template>


<style scoped>
main {
  display: grid;
  no-grid-template-columns: auto auto auto;
  gap: 1em;
}

.post-card {
  aspect-ratio: 3 / 2;
  aspect-ratio: 4 / 3;
  aspect-ratio: 1;
  aspect-ratio: 6 / 1;
}
</style>