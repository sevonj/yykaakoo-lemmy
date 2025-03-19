<script setup lang="ts">
import type { FeedLayoutType } from './FeedComponent.vue'
import { type Ref } from 'vue'

defineProps<{
  feedLayout: Ref<FeedLayoutType, FeedLayoutType>
}>()

defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  layoutChanged(payload: { feedLayout: FeedLayoutType }) {
    return true
  },
})
</script>

<template>
  <div class="post-actions-elev-cont">
    <div class="post-actions-elev-subcont">
      <div class="post-actions-elev">
        <form id="feedsortbar">
          <input
            type="radio"
            id="Grid"
            value="Grid"
            @click="$emit('layoutChanged', { feedLayout: 'Grid' })"
          />
          <label for="Grid">View Grid</label>

          <input
            type="radio"
            id="List"
            value="Hot"
            @click="$emit('layoutChanged', { feedLayout: 'List' })"
          />
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

input:checked + label {
  font-weight: 900;
}

input + label {
  padding-left: 12px;
  color: gray;
  font-size: 1.5em;
}
</style>
