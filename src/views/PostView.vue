<script setup lang="ts">
import type { GetPostResponse, LemmyHttp, PostView } from 'lemmy-js-client'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostTile from '@/components/PostTile.vue'

const route = useRoute()
const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const postView = ref<PostView | undefined>()

async function loadPost() {
  const id = Number(route.params.postId)
  postView.value = (await fetchPost(id)).post_view
}

async function fetchPost(id: number): Promise<GetPostResponse> {
  return await client.getPost({ id })
}

watch(
  () => route.params.postId,
  async (newParam) => {
    const id = Number(newParam)
    postView.value = (await fetchPost(id)).post_view
  },
)

loadPost()
</script>

<template>
  <main>
    <PostTile
      v-if="postView"
      :post-view
      :start-open="true"
      :show-comm="true"
      :feed-location="{ v: 'All' }"
    />
  </main>
</template>

<style>
.feed-header {
  padding: 0 8px 12px 8px;
  background: var(--color-background-soft);
}
</style>
