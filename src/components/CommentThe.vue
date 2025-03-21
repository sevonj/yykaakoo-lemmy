<script async setup lang="ts">
import type { LemmyHttp, GetComments, CommentView } from 'lemmy-js-client'
import { ref, getCurrentInstance, type Ref } from 'vue'
import VueMarkdown from 'vue-markdown-render'
import SpeechBubble from './common/SpeechBubble.vue'
import UserMeta from './common/UserMeta.vue'
import Badge from './common/BadgeThe.vue'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'
import RelativeTimestamp from './textformat/RelativeTimestamp.vue'

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const props = defineProps<{
  commentView: CommentView
  //depth?: { type: number, default: 1 }
}>()

const getCommentsForm: GetComments = {
  parent_id: props.commentView.comment.id,
  sort: 'New',
  max_depth: 1,
}

const replies: Ref<CommentView[], CommentView[]> = ref([])

async function getReplies() {
  replies.value = (await client.getComments(getCommentsForm)).comments.filter(
    (comment) => comment.comment.id != props.commentView.comment.id,
  )
}
</script>

<script lang="ts"></script>

<template>
  <div class="comment-cont">
    <SpeechBubble>
      <template v-slot:content>
        <Badge v-if="commentView.comment.deleted" text="Deleted by author." />
        <Badge v-if="commentView.comment.removed" text="Removed by a mod or an admin." />
        <Badge v-if="commentView.comment.distinguished" text="distinguished" />
        <VueMarkdown :source="commentView.comment.content" class="md" />
      </template>

      <template v-slot:below>
        <div class="flex-row flex-1" style="gap: 12px">
          <div class="flex-row no-shrink" style="">
            <ArrowUpIcon class="meta-icon" />
            <p>{{ commentView.counts.upvotes }}</p>
          </div>

          <div class="flex-row no-shrink" style="">
            <ArrowDownIcon class="meta-icon" />
            <p>{{ commentView.counts.downvotes }}</p>
          </div>
        </div>
        <RelativeTimestamp :timestamp="commentView.counts.published" />
      </template>
    </SpeechBubble>

    <UserMeta :person="commentView.creator">
      <template v-slot:badges>
        <Badge v-if="commentView.creator_is_moderator" text="mod" />
        <Badge v-if="commentView.creator_is_admin" text="admin" />
        <Badge v-if="commentView.creator_banned_from_community" text="banned" />
      </template>
    </UserMeta>

    <div class="comment-reply-cont" v-if="commentView.counts.child_count">
      <a v-if="replies.length == 0" @click="getReplies">
        Fetch replies ({{ commentView.counts.child_count }})
      </a>
      <CommentThe v-for="reply in replies" :comment-view="reply" :key="reply.comment.id" />
    </div>
  </div>
</template>

<style>
.comment-cont {
  margin-bottom: 4px;
}
</style>
