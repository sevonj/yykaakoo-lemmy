<script setup lang="ts">

import type { FeedLocation } from '@/views/FrontpageView.vue';
import { type Ref } from 'vue'


const props = defineProps<{
    feedLocation: Ref<FeedLocation, FeedLocation>,
}>()

defineEmits({
    changed(_payload: { feedLocation: FeedLocation }) { true }
});

function locationName(): string {
    switch (props.feedLocation.value) {
        case "All":
            return "All"
        case "Local":
            return "At Sopuli"
        case "Subscribed":
            return "Followed"
    }
}

</script>

<template>
    <div id="feed-location-selector">
        <form @change="$emit('changed', { feedLocation: feedLocation.value })">
            
            <input type="radio" id="All" value="All" v-model="feedLocation.value" />
            <label for="All">All</label>

            <input type="radio" id="Local" value="Local" v-model="feedLocation.value" />
            <label for="Local">At Sopuli</label>

            <input type="radio" id="Subscribed" value="Subscribed" v-model="feedLocation.value" />
            <label for="Subscribed">Followed</label>

        </form>
        <h1>{{ locationName() }}</h1>
    </div>
</template>

<style>
#feed-location-selector {
    display: flex;
    flex-direction: column;
}
</style>