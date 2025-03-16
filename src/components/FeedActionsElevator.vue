<script setup lang="ts">
import type { FeedLayoutType } from '@/views/FrontpageView.vue';
import { ref } from 'vue';

const feedLayout = ref<FeedLayoutType>("List");

const emit = defineEmits({
    layoutChanged(payload: { feedLayout: FeedLayoutType }) { true }
});

</script>

<template>
    <div class="post-actions-elev-cont">
        <div class="post-actions-elev-subcont">
            <div class="post-actions-elev">
                <!--a> thread top</a>
                <a> close thread</a-->


                <form id="feedsortbar" @change="$emit('layoutChanged', { feedLayout })">
                    <input type="radio" id="Grid" value="Grid" v-model="feedLayout" />
                    <label for="Grid">View Grid</label>

                    <input type="radio" id="List" value="Hot" v-model="feedLayout" />
                    <label for="List">View List</label>
                </form>
            </div>
        </div>
    </div>
</template>


<style>
.post-actions-elev-cont {
    height: 0;
    position: sticky;
    top: 256px;
}

.post-actions-elev-subcont {
    width: 0;
    height: 0;
    float: right;
}

.post-actions-elev {
    display: flex;
    flex-direction: column;
    text-wrap-mode: nowrap;
    height: 192px;
}

.scrolltotop:not([data-scroll='0']) {
    display: none;
}
</style>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}

input {
    display: none;
}

input:checked+label {
    font-weight: 900;
}

input+label {
    padding-left: 12px;
    color: gray;
    font-size: 1.5em;
}
</style>