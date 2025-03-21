<script setup lang="ts">
import type { SortType } from 'lemmy-js-client'
import { type Ref } from 'vue'

const props = defineProps<{
  sortType: Ref<SortType, SortType>
}>()

const sortTypeInternal = props.sortType

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
      <p class="title">Sort:</p>
      <form @change="$emit('changed', { sortType: sortTypeInternal })">
        <input type="radio" id="active" value="Active" v-model="sortTypeInternal" />
        <label for="active">Active discussion</label>

        <input type="radio" id="hot" value="Hot" v-model="sortTypeInternal" />
        <label for="hot">Hot</label>

        <input type="radio" id="new" value="New" v-model="sortTypeInternal" />
        <label for="new">New</label>

        <input type="radio" id="scaled" value="Scaled" v-model="sortTypeInternal" />
        <label for="scaled">Scaled</label>

        <!--input type="radio" id="new-comments" value="NewComments" v-model="sortType.value" />
        <label for="new-comments">New comments</label-->

        <input type="radio" id="top" value="TopDay" v-model="sortTypeInternal" />
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
  margin-bottom: 6px;
  overflow: scroll;
  text-wrap-mode: nowrap;
}

.title {
  font-size: small;
  align-self: center;
  padding: 0 4px;
}

input {
  display: none;
}

input:checked + label {
  color: var(--color-navlink-active);
}

input + label {
  padding: 0 8px;
}
</style>
