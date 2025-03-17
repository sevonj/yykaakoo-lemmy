<script async setup lang="ts">
import type { LemmyHttp, GetComments, CommentView } from 'lemmy-js-client';
import { ref, getCurrentInstance, type Ref } from 'vue';
import VueMarkdown from 'vue-markdown-render';
import SpeechBubble from './common/SpeechBubble.vue';
import UserMeta from './common/UserMeta.vue'
import Badge from './common/Badge.vue';
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/vue/24/solid";

const instance = getCurrentInstance();
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client;

const props = defineProps<{
    commentView: CommentView,
    //depth?: { type: number, default: 1 }
}>();

const getCommentsForm: GetComments = {
    parent_id: props.commentView.comment.id,
    sort: "New",
    max_depth: 1,
}

let replies: Ref<CommentView[], CommentView[]> = ref([]);

async function getReplies() {
    console.log("getting comments");
    replies.value = (await client.getComments(getCommentsForm)).comments.filter(comment => comment.comment.id != props.commentView.comment.id);
}

</script>

<script lang="ts">


</script>

<template>



    <SpeechBubble>
        <template v-slot:top>
            <p> >> {{ commentView.comment.path }}</p>
            <Badge v-if="commentView.comment.deleted" text="deleted" />
            <Badge v-if="commentView.comment.removed" text="removed" />
            <Badge v-if="commentView.comment.distinguished" text="distinguished" />
        </template>
        <template v-slot:content>
            <VueMarkdown :source="commentView.comment.content" class="md" />
        </template>
        <template v-slot:below>

            <div class="flex-row" style="">
                <ArrowUpIcon class="meta-icon" />
                <p>{{ commentView.counts.upvotes }}</p>
            </div>

            <div class="flex-row" style="">
                <ArrowDownIcon class="meta-icon" />
                <p>{{ commentView.counts.downvotes }}</p>
            </div>
            
            <div style="flex-grow: 1;"></div>

            <a v-if="commentView.counts.child_count > 0 && replies.length == 0" @click="getReplies">
                Fetch replies ({{ commentView.counts.child_count }})
            </a>
        </template>
    </SpeechBubble>


    <UserMeta :person="commentView.creator">
        <template v-slot="badges">
            <Badge v-if="commentView.creator_is_moderator" text="mod" />
            <Badge v-if="commentView.creator_is_admin" text="admin" />
            <Badge v-if="commentView.creator_banned_from_community" text="banned" />
        </template>
    </UserMeta>

    <div class="comment-reply-cont">
        <Comment v-for="reply in replies" :comment-view="reply" :key="reply.comment.id" />
    </div>
</template>

<style>
.comment-reply-cont {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-top: 3px;
    padding-left: 36px;
}
</style>