<script setup lang="ts">
import { type PostView } from 'lemmy-js-client'
import Badge from './common/BadgeThe.vue'
import SpeechBubble from './common/SpeechBubble.vue'
import UserMeta from './common/UserMeta.vue'
import { nextTick, ref, type Ref } from 'vue'
import MarkdownView from './markdown/MarkdownView.vue'
import CommentsThread from './CommentsThread.vue'
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/solid'
import EmbedLinkPreview from './links/EmbedLinkPreview.vue'
import RelativeTimestamp from './textformat/RelativeTimestamp.vue'
import VoteBlock from './common/VoteBlock.vue'
import { optimizeThumbnailUrl } from '@/lib/url'
import MediaTypeIcon from './icons/MediaTypeIcon.vue'
import ExternalUrl from './textformat/ExternalUrl.vue'
import ForeignInstanceExpandHeader from './headers/ForeignInstanceExpandHeader.vue'
import CommunityExpandHeader from './headers/CommunityExpandHeader.vue'

const props = defineProps<{
  postView: PostView
  showComm?: boolean
  startOpen?: boolean
}>()

const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opened(post_id: number) {
    return true
  },
})

const postId = props.postView.post.id
const thumbnailUrl = props.postView.post.thumbnail_url
  ? optimizeThumbnailUrl(props.postView.post.thumbnail_url)
  : undefined
const fullImageUrl = isImage() ? props.postView.post.url : null
const externalUrl =
  isExternalLink() && props.postView.post.url ? new URL(props.postView.post.url) : null
const mediaType = props.postView.post.url_content_type?.split('/')[0]

const isOpen: Ref<boolean, boolean> = ref(props.startOpen)

const htmlPostArticle = ref<HTMLElement | null>(null)

defineExpose({ closeComments, postId })

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

  nextTick(scrollToSelfUpwards)
}

function scrollToSelf(): void {
  htmlPostArticle.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function scrollToSelfUpwards(): void {
  if (!htmlPostArticle.value || htmlPostArticle.value.getBoundingClientRect().top > 0) {
    return
  }
  htmlPostArticle.value.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function isImage(): boolean {
  if (!props.postView.post.url_content_type) {
    return false
  }
  return props.postView.post.url_content_type?.startsWith('image/')
}

function isExternalLink(): boolean {
  if (!props.postView.post.url_content_type || isImage()) {
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
          <img v-if="thumbnailUrl" :src="thumbnailUrl" />
          <div v-else-if="isExternalLink()"></div>
          <MarkdownView
            v-else-if="postView.post.body"
            :source="postView.post.body"
            class="post-body"
          />
          <div v-if="externalUrl" class="post-preview-link-badge-cont">
            <MediaTypeIcon :media-type class="post-preview-link-badge" />
            <p>
              <ExternalUrl :url="externalUrl" />
            </p>
          </div>
        </div>
        <div v-else-if="fullImageUrl" class="full-image">
          <img :src="fullImageUrl" />
        </div>

        <EmbedLinkPreview
          v-if="externalUrl && isOpen"
          :url="externalUrl"
          :thumbnail-url
          :title="postView.post.embed_title"
          :desc="postView.post.embed_description"
          :media-type
        />

        <h1 class="post-title" :class="isOpen ? '' : 'post-title-closed'">
          {{ postView.post.name }}
        </h1>

        <div v-if="isOpen">
          <MarkdownView v-if="postView.post.body" :source="postView.post.body" class="post-body" />
        </div>
      </template>

      <template v-slot:below>
        <div class="flex-row flex-1" style="gap: 12px">
          <div class="flex-row no-shrink" style="">
            <VoteBlock :upvotes="postView.counts.upvotes" :downvotes="postView.counts.downvotes" />
          </div>

          <div class="flex-row no-shrink" style="">
            <ChatBubbleLeftIcon class="meta-icon" />
            <p>{{ postView.counts.comments }}</p>
          </div>
        </div>

        <RelativeTimestamp :timestamp="postView.counts.published" />
      </template>
    </SpeechBubble>
    <UserMeta :person="postView.creator" :comm="showComm ? postView.community : undefined">
      <template v-slot:user_badges>
        <Badge v-if="postView.creator_is_moderator" text="mod" />
        <Badge v-if="postView.creator_is_admin" text="admin" />
        <Badge v-if="postView.creator_banned_from_community" text="banned" />
      </template>
    </UserMeta>

    <div v-if="isOpen && showComm" class="fullpost-comminfo">
      <Suspense>
        <ForeignInstanceExpandHeader :id="postView.community.instance_id" />
      </Suspense>
      <CommunityExpandHeader :comm="postView.community" />
    </div>

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
  bottom: 30px;

  display: flex;
  align-items: center;
  overflow: hidden;
  height: 24px;

  background: #000a;
  backdrop-filter: blur(4px);
  text-wrap-mode: nowrap;
  font-size: small;
}

.post-preview-link-badge {
  flex-shrink: 0;
  aspect-ratio: 1;
  height: 100%;
  padding: 4px;
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

.fullpost-comminfo {
  margin: 8px 0;
}
</style>
