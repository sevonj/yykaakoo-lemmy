<script setup lang="ts">

import { LemmyHttp, type CommentView, type GetComments, type PostId, type PostView } from "lemmy-js-client";
import Badge from "./common/Badge.vue";
import SpeechBubble from "./common/SpeechBubble.vue";
import VoteBlock from "./common/VoteBlock.vue";
import UserMeta from './common/UserMeta.vue'
import { getCurrentInstance, ref, type Ref } from "vue";
import Comment from "./Comment.vue";
import VueMarkdown from "vue-markdown-render";

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;

const props = defineProps<{
    postView: PostView,
}>()

const emit = defineEmits({
    opened(_post_id: number) { true }
})

defineExpose({ closeComments })

const getCommentsForm: GetComments = {
    post_id: props.postView.post.id,
    sort: "New",
    max_depth: 1,
}

let comments: Ref<CommentView[], CommentView[]> = ref([]);
let is_open: Ref<boolean, boolean> = ref(false);

async function openComments() {
    console.log("getting comments");
    emit('opened', props.postView.post.id);
    comments.value = (await client.getComments(getCommentsForm)).comments;
    is_open.value = true;
}

function closeComments() {
    comments.value = [];
    is_open.value = false;
}

</script>

<template>
    <article :style="is_open ? 'grid-column: 1/-1;' : ''">
        <div class="article-horizontal">

            <VoteBlock />

            <SpeechBubble :style="is_open ? 'min-height: 500px;' : ''">

                <template v-slot:top>
                    <p>!{{ postView.community.name }}@{{ postView.community.instance_id }}</p>
                    <p>{{ postView.counts.published }}</p>
                </template>

                <template v-slot:content>
                    <div>
                        <h1 class="post-title">{{ postView.post.name }}</h1>
                    </div>
                    <div v-if="postView.post.thumbnail_url" class="thumbnail">
                        <img v-if="postView.post.thumbnail_url" :src="postView.post.thumbnail_url">
                    </div>
                    <div v-if="postView.post.body">
                        <div v-if="!is_open" style="max-height: 200px; overflow: hidden;">
                            <VueMarkdown class="post-body md" :source="postView.post.body" />
                        </div>
                        <VueMarkdown v-else class="post-body md" :source="postView.post.body" />
                    </div>

                <a style="margin-left: 28px; text-align: end;" v-if="!is_open" @click="openComments">Open</a>
                <a style="margin-left: 28px; text-align: end;" v-else @click="closeComments">Close</a>
                </template>

                <template v-slot:bottom>
                    <div style="flex-grow: 1;"></div>
                    <p>Score: {{ postView.counts.upvotes }}/{{ postView.counts.downvotes }}</p>
                    <p>Comments: {{ postView.counts.comments }}</p>
                </template>

            </SpeechBubble>
        </div>

        <UserMeta :person="postView.creator">
            <template v-slot="badges">
                <Badge v-if="postView.creator_is_moderator" text="mod" />
                <Badge v-if="postView.creator_is_admin" text="admin" />
                <Badge v-if="postView.creator_banned_from_community" text="banned" />
            </template>
        </UserMeta>

        <div class="post-child-cont">
            <Comment v-for="commentView in comments" :comment-view="commentView" :key="commentView.comment.id" />
        </div>


    </article>
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
<style scoped>
article {
    overflow: hidden;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 3px;
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
    font-size: 1.4em;
}

.meta-icon {
    scolor: black;
}

.thumbnail {
    background-color: black;
    height: 128px;
    width: 192px;
    border-right: 8px solid orangered;
    margin: 6px;
    outline: 3px solid black;
    display: flex;
    align-items: center;
}

.thumbnail>img {
    max-width: 50vw;
    max-height: 50vh;
    z-index: 1;
    object-fit: cover;
    position: relative;
    transition: .2s;
}

.thumbnail>img:not(:hover) {
    max-width: 100%;
    max-height: 100%;
}
</style>