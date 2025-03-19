<script setup lang="ts">
import type { SortType } from 'lemmy-js-client'
import { type Ref } from 'vue'

defineProps<{
  sortType: Ref<SortType, SortType>
}>()

defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changed(payload: { sortType: SortType }) {
    return true
  },
})
</script>

<template>
  <div>
    <div class="feedsortbar">
      <p class="title">SORT</p>
      <form @change="$emit('changed', { sortType: sortType.value })">
        <input type="radio" id="active" value="Active" v-model="sortType.value" />
        <label for="active">Active discussion</label>

        <input type="radio" id="hot" value="Hot" v-model="sortType.value" />
        <label for="hot">Hot</label>

        <input type="radio" id="new" value="New" v-model="sortType.value" />
        <label for="new">New</label>

        <input type="radio" id="scaled" value="Scaled" v-model="sortType.value" />
        <label for="scaled">Scaled</label>

        <!--input type="radio" id="new-comments" value="NewComments" v-model="sortType.value" />
        <label for="new-comments">New comments</label-->

        <input type="radio" id="top" value="TopDay" v-model="sortType.value" />
        <label for="top">Top day</label>

        <!--input type="radio" id="controversial" value="Controversial" v-model="sortType.value" />
        <label for="controversial">Controversial</label-->
      </form>
    </div>
  </div>
</template>

<style scoped>
.feedsortbar {
  display: flex;
}

.title {
  font-family: monospace;
  font-weight: bolder;
  font-size: small;
  height: 1.5em;
  align-self: center;
  color: white;
  padding: 0 8px;
  border-right: 4px solid black;
}

input {
  display: none;
}

input:checked + label {
  color: white;
}

input + label {
  padding: 0 8px;
}
</style>
