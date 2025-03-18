<script setup lang="ts">

import { type PostView } from "lemmy-js-client";
import Badge from "./common/Badge.vue";
import SpeechBubble from "./common/SpeechBubble.vue";
import UserMeta from './common/UserMeta.vue'
import { nextTick, ref, type Ref } from "vue";
import VueMarkdown from "vue-markdown-render";
import CommentsThread from './CommentsThread.vue'
import { XMarkIcon, ChatBubbleLeftIcon, ArrowUpIcon, ArrowDownIcon, LinkIcon } from "@heroicons/vue/24/solid";
import { useRoute } from 'vue-router';
import ExternalLink from "./common/ExternalLink.vue";

const baseUrl = import.meta.env.BASE_URL;

const route = useRoute();

const props = defineProps<{
  postView: PostView,
}>()

const emit = defineEmits({
  opened(_post_id: number) { return true; }
})

defineExpose({ closeComments })

const htmlPostArticle = ref<HTMLElement | null>(null)

const is_open: Ref<boolean, boolean> = ref(false);

async function openComments(): Promise<void> {
  if (is_open.value) {
    return;
  }
  console.log("getting comments");
  emit('opened', props.postView.post.id);
  is_open.value = true;

  nextTick(scrollToSelf);
}

function closeComments(): void {
  is_open.value = false;

  nextTick(scrollToSelf);
}

function scrollToSelf(): void {
  htmlPostArticle.value?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
}

</script>

<template>
  <article :class="is_open ? 'post-expanded' : ''" ref="htmlPostArticle">
    <SpeechBubble @click="openComments" :class="!is_open ? 'post-bubble' : ''">

      <template v-slot:above>
        <p class="meta">{{ postView.counts.published }}</p>
      </template>

      <template v-slot:content>

        <div v-if="!is_open" class="post-preview">
          <img v-if="postView.post.thumbnail_url" :src="postView.post.thumbnail_url">
          <VueMarkdown v-else-if="postView.post.body" class="post-body md" :source="postView.post.body" />
        </div>

        <div v-else-if="postView.post.thumbnail_url" class="full-image">
          <img v-if="postView.post.thumbnail_url" :src="postView.post.thumbnail_url">
        </div>

        <h1 class="post-title" style="text-overflow: ellipsis; overflow: hidden;">
          <LinkIcon v-if="postView.post.url" style="max-height: .8em;" />
          {{ postView.post.name }}
        </h1>

        <div v-if="is_open">
          <div v-if="postView.post.body">
            <VueMarkdown class="post-body md" :source="postView.post.body" />
          </div>
          <ExternalLink v-if="postView.post.url" :url="postView.post.url" />
          <p>{{ postView.post.url }} | {{ postView.post.url_content_type }}</p>
        </div>
      </template>

      <template v-slot:below>
        <div style="flex-grow: 1;"></div>

        <div class="flex-row" style="">
          <ArrowUpIcon class="meta-icon" />
          <p>{{ postView.counts.upvotes }}</p>
        </div>

        <div class="flex-row" style="">
          <ArrowDownIcon class="meta-icon" />
          <p>{{ postView.counts.downvotes }}</p>
        </div>

        <div class="flex-row" style="">
          <ChatBubbleLeftIcon class="meta-icon" />
          <p>{{ postView.counts.comments }}</p>
        </div>
      </template>

    </SpeechBubble>

    <UserMeta :person="postView.creator" :community="postView.community">
      <template v-slot:user_badges>
        <Badge v-if="postView.creator_is_moderator" text="mod" />
        <Badge v-if="postView.creator_is_admin" text="admin" />
        <Badge v-if="postView.creator_banned_from_community" text="banned" />
      </template>

      <!--template v-slot:user_community>
        <a :href=" communityUrl()" class="meta-link">{{ communityIdentifier() }}</a>
      </template-->
    </UserMeta>

    <div @click="closeComments" v-if="is_open" class="thread-close-div">
      <p>Close thread</p>
      <XMarkIcon />
    </div>
    <CommentsThread v-if="is_open" :post_id="postView.post.id" />


  </article>
</template>
<style scoped>
article {
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.post-expanded {
  grid-column: 1/-1;
}

.post-bubble {
  cursor: pointer;
  transition: transform .1s;
}

.post-bubble:hover {
  transform: scale(.995);
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
  height: 3em;
  max-height: 3em;
  overflow: hidden;
  text-overflow: "...";
}

.thread-close-div {
  color: lightgrey;
  height: 24px;
  max-height: 24px;
  float: right;
  display: flex;
  justify-content: end;
  transition: .2s;
}

.thread-close-div:hover {
  background-color: #fff7;
  color: black;
}

.thread-close-div>* {
  max-height: 24px;
}

.post-preview {
  background: black;
  width: 100%;
  aspect-ratio: 3 / 2;
  max-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.post-preview>* {
  object-fit: cover;
  width: 100%;
  height: 100%;
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
  ;
}

.post-preview-link * {
  max-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.full-image {
  background: black;
  width: 100%;
  max-height: 60vh;
  aspect-ratio: 3 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.full-image>* {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
