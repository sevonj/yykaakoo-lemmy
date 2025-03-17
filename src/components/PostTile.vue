<script setup lang="ts">

import { type PostView } from "lemmy-js-client";
import Badge from "./common/Badge.vue";
import SpeechBubble from "./common/SpeechBubble.vue";
import UserMeta from './common/UserMeta.vue'
import { ref, type Ref } from "vue";
import VueMarkdown from "vue-markdown-render";
import CommentsThread from './CommentsThread.vue'
import { XMarkIcon, ChatBubbleLeftIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/vue/24/solid";
import { nextTick } from "process";

const props = defineProps<{
    postView: PostView,
}>()

const emit = defineEmits({
    opened(_post_id: number) { true }
})

defineExpose({ closeComments })

const htmlPostArticle = ref<HTMLElement | null>(null)

let is_open: Ref<boolean, boolean> = ref(false);

async function openComments() {
    if (is_open.value) {
        return;
    }
    console.log("getting comments");
    emit('opened', props.postView.post.id);
    is_open.value = true;

    let pos = htmlPostArticle.value?.offsetTop;
    if (!pos) {
        return
    }
    window.scrollTo({
        top: pos + 400,
        behavior: "smooth"
    });
}

function closeComments() {
    is_open.value = false;

    let pos = htmlPostArticle.value?.offsetTop;
    if (!pos) {
        return
    }
    window.scrollTo({
        top: pos - 400,
        behavior: "smooth"
    });
}

</script>

<template>
    <article :style="is_open ? 'grid-column: 1/-1;' : ''" ref="htmlPostArticle">
        <SpeechBubble @click="openComments" :class="!is_open ? 'post-bubble' : ''">
            <template v-slot:top>
                <p>!{{ postView.community.name }}@{{ postView.community.instance_id }}</p>
                <p>{{ postView.counts.published }}</p>
            </template>

            <template v-slot:content>

                <div :class="is_open ? 'full-image' : 'thumbnail'">
                    <img v-if="postView.post.thumbnail_url" :src="postView.post.thumbnail_url">
                    <VueMarkdown v-else-if="!is_open && postView.post.body" class="post-body md"
                        :source="postView.post.body" />
                </div>

                <h1 class="post-title">{{ postView.post.name }}</h1>

                <div v-if="is_open">
                    <div v-if="postView.post.body">
                        <VueMarkdown class="post-body md" :source="postView.post.body" />
                    </div>
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

        <UserMeta :person="postView.creator">
            <template v-slot="badges">
                <Badge v-if="postView.creator_is_moderator" text="mod" />
                <Badge v-if="postView.creator_is_admin" text="admin" />
                <Badge v-if="postView.creator_banned_from_community" text="banned" />
            </template>
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

.thumbnail {
    background: black;
    width: 100%;
    aspect-ratio: 3 / 2;
    max-height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.thumbnail>* {
    object-fit: cover;
    width: 100%;
    height: 100%;
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