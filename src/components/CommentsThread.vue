<script setup lang="ts">
import type { CommentView, GetComments, LemmyHttp, PostId } from 'lemmy-js-client'
import CommentThe from './CommentThe.vue'
import { getCurrentInstance, ref } from 'vue'

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const props = defineProps<{
  post_id: PostId
}>()

defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opened(post_id: number) {
    return true
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
  <div class="comment-reply-cont">
    <CommentThe
      v-for="commentView in comments"
      :comment-view="commentView"
      :key="commentView.comment.id"
      class="pop-in"
    />
  </div>
</template>

<style>
.comment-reply-cont {
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-left: 1px solid var(--color-border-mute);
  margin-top: 8px;
  padding-left: 12px;
}

.comment-reply-cont:hover {
  border-left: 1px solid var(--color-border);
}

@media (max-width: 460px) {
  .comment-reply-cont {
    padding-left: 8px;
  }
}

@media (max-width: 420px) {
  .comment-reply-cont {
    padding-left: 6px;
  }
}
</style>
