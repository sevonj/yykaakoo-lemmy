<script setup lang="ts">

import type { SortType } from 'lemmy-js-client';
import { ref, type Ref } from 'vue'

const sortType: Ref<SortType, SortType> = ref("Active");

const emit = defineEmits({
    changed(payload: { sortType: SortType }) { true }
});

</script>

<template>
    <form id="feedsortbar" @change="$emit('changed', { sortType })">

        <p class="title">SORT</p>

        <input type="radio" id="active" value="Active" v-model="sortType" />
        <label for="active">Active discussion</label>

        <input type="radio" id="hot" value="Hot" v-model="sortType" />
        <label for="hot">Hot</label>

        <input type="radio" id="new" value="New" v-model="sortType" />
        <label for="new">New</label>

        <input type="radio" id="scaled" value="Scaled" v-model="sortType" />
        <label for="scaled">Scaled</label>

        <input type="radio" id="new-comments" value="NewComments" v-model="sortType" />
        <label for="new-comments">New comments</label>

        <input type="radio" id="top" value="TopDay" v-model="sortType" />
        <label for="top">Top day</label>

        <input type="radio" id="controversial" value="Controversial" v-model="sortType" />
        <label for="controversial">Controversial</label>

    </form>
</template>

<style scoped>
#feedsortbar {
    display: flex;
    color: black;
    background-color: khaki;
}

.title {
    font-family: monospace;
    font-weight: bolder;
    font-size: small;
    height: 100%;
    align-self: center;
    background: slategray;
    color: white;
    padding: 0 8px;
    border-right: 4px solid black;
}

input {
    display: none;
}

input:checked+label {
    background: orange;
}

input+label {
    padding: 0 8px;
}
</style>