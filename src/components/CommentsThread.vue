<script setup lang="ts">
import type { CommentView, GetComments, LemmyHttp, PostId } from 'lemmy-js-client'
import CommentThe from './CommentThe.vue'
import { getCurrentInstance, ref } from 'vue'

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const props = defineProps<{
  post_id: PostId
}>()

const emit = defineEmits({
  opened(_post_id: number) {
    true
  },
})

const getCommentsForm: GetComments = {
  post_id: props.post_id,
  sort: 'New',
  max_depth: 1,
}

const comments = ref<CommentView[]>([])

async function fetchComments() {
  comments.value = (await client.getComments(getCommentsForm)).comments
}

fetchComments()
</script>

<template>
  <div class="post-child-cont">
    <CommentThe v-for="commentView in comments" :comment-view="commentView" :key="commentView.comment.id" />
  </div>
</template>

<style>
.post-child-cont {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 3px;
  padding-left: 36px;
}
</style>
