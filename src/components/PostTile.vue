<script setup lang="ts">
import { type PostView } from 'lemmy-js-client'
import Badge from './common/BadgeThe.vue'
import SpeechBubble from './common/SpeechBubble.vue'
import UserMeta from './common/UserMeta.vue'
import { nextTick, ref, type Ref } from 'vue'
import VueMarkdown from 'vue-markdown-render'
import CommentsThread from './CommentsThread.vue'
import { ChatBubbleLeftIcon, ArrowUpIcon, ArrowDownIcon, LinkIcon } from '@heroicons/vue/24/solid'
import ExternalLink from './links/ExternalLink.vue'
import type { FeedLocation } from './FeedThe.vue'
import RelativeTimestamp from './textformat/RelativeTimestamp.vue'

const props = defineProps<{
  postView: PostView
  feedLocation: FeedLocation
}>()

const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opened(post_id: number) {
    return true
  },
})

const postId = props.postView.post.id

defineExpose({ closeComments, postId })

const htmlPostArticle = ref<HTMLElement | null>(null)
const isOpen: Ref<boolean, boolean> = ref(false)

async function openComments(): Promise<void> {
  if (isOpen.value) {
    return
  }
  emit('opened', props.postView.post.id)
  isOpen.value = true

  nextTick(scrollToSelf)
}

function closeComments(): void {
  isOpen.value = false

  nextTick(scrollToSelf)
}

function scrollToSelf(): void {
  htmlPostArticle.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function isExternalLink(): boolean {
  if (!props.postView.post.url_content_type) {
    return false
  }
  if (props.postView.post.url_content_type.startsWith('image/')) {
    return false
  }
  return true
}
</script>

<template>
  <article :class="isOpen ? 'post-expanded' : 'post-not-expanded'" ref="htmlPostArticle">
    <SpeechBubble
      @click="openComments"
      :class="isOpen ? 'post-bubble-expanded' : 'post-bubble-not-expanded'"
    >
      <template v-slot:content>
        <div v-if="!isOpen" class="post-preview">
          <img v-if="postView.post.thumbnail_url" :src="postView.post.thumbnail_url" />
          <div v-else-if="isExternalLink()"></div>
          <VueMarkdown
            v-else-if="postView.post.body"
            class="post-body md"
            :source="postView.post.body"
          />
          <div v-if="isExternalLink()" class="post-preview-link-badge-cont">
            <LinkIcon class="post-preview-link-badge" />
          </div>
        </div>
        <div v-else-if="postView.post.thumbnail_url" class="full-image">
          <img v-if="postView.post.thumbnail_url" :src="postView.post.thumbnail_url" />
        </div>

        <ExternalLink v-if="postView.post.url && isOpen" :url="postView.post.url" />

        <h1 class="post-title" :class="isOpen ? '' : 'post-title-closed'">
          {{ postView.post.name }}
        </h1>

        <div v-if="isOpen">
          <div v-if="postView.post.body">
            <VueMarkdown class="post-body md" :source="postView.post.body" />
          </div>
        </div>
      </template>

      <template v-slot:below>
        <div class="flex-row flex-1" style="gap: 12px">
          <div class="flex-row no-shrink" style="">
            <ArrowUpIcon class="meta-icon" />
            <p>{{ postView.counts.upvotes }}</p>
          </div>

          <div class="flex-row no-shrink" style="">
            <ArrowDownIcon class="meta-icon" />
            <p>{{ postView.counts.downvotes }}</p>
          </div>

          <div class="flex-row no-shrink" style="">
            <ChatBubbleLeftIcon class="meta-icon" />
            <p>{{ postView.counts.comments }}</p>
          </div>
        </div>

        <RelativeTimestamp :timestamp="postView.counts.published" />
      </template>
    </SpeechBubble>
    <UserMeta
      :person="postView.creator"
      :comm="feedLocation.v != 'Community' ? postView.community : undefined"
    >
      <template v-slot:user_badges>
        <Badge v-if="postView.creator_is_moderator" text="mod" />
        <Badge v-if="postView.creator_is_admin" text="admin" />
        <Badge v-if="postView.creator_banned_from_community" text="banned" />
      </template>
    </UserMeta>

    <CommentsThread v-if="isOpen" :post_id="postView.post.id" />
  </article>
</template>
<style>
article {
  max-width: 1000px;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
}

.post-expanded {
  grid-column: 1/-1;
  margin-left: auto;
  margin-right: auto;
}

.post-not-expanded:active {
  transform: translate(0, 10px);
  transition: 0.1s;
}

@media (max-width: 460px) {
  .post-bubble-expanded {
    margin-left: -8px;
    margin-right: -8px;
  }

  .post-bubble-expanded .speechbub {
    border-radius: 0px;
    border-left: 0;
    border-right: 0;
  }
}

.post-bubble-not-expanded {
  cursor: pointer;
}

.article-horizontal {
  flex-grow: 1;
  display: flex;
  gap: 3px;
}

.post-body {
  max-width: 100%;
  overflow: hidden;
}

.post-title {
  margin: 0 8px 8px 8px;
  font-size: 1.2em;
  text-overflow: ellipsis;
  overflow: hidden;
}

.post-title-closed {
  max-height: 3.2em;
  height: 3.2em;
}

.post-preview {
  width: 100%;
  aspect-ratio: 3 / 2;
  max-height: 240px;
  overflow: hidden;
}

.post-preview > * {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.post-preview-link-badge-cont {
  position: relative;
  max-width: 0;
  max-height: 0;
  bottom: 34px;
  left: 4px;
}

.post-preview-link-badge {
  height: 24px;
  width: 24px;
  background: #000b;
  padding: 4px;
  border-radius: 8px;
}

.post-preview-link-cont {
  position: relative;
  height: 0;
}

.post-preview-link {
  text-wrap-mode: nowrap;
  font-size: small;
  position: relative;
  top: 8px;
  left: 8px;
  height: 2em;
  aspect-ratio: 1;
  background: #000a;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  padding: 4px;
}

.post-preview-link * {
  max-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.full-image {
  background-color: var(--color-background);
  flex-shrink: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 8px;
}

.full-image > * {
  max-width: 100%;
  max-height: 60vh;
}
</style>
