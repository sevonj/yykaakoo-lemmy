<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import MarkdownView from '../markdown/MarkdownView.vue'

defineProps<{
  title: string
  source: string
}>()

const showDescription = ref(false)

function toggleDescription(): void {
  showDescription.value = !showDescription.value
}
</script>

<template>
  <div class="md-expand">
    <a @click="toggleDescription" class="md-expand-titlerow">
      <ChevronUpIcon class="md-expand-icon" v-if="showDescription" />
      <ChevronDownIcon class="md-expand-icon" v-else />
      <h3 style="margin-right: 4px">{{ title }}</h3>
    </a>
    <MarkdownView v-if="showDescription" class="md community-header-desc" :source />
  </div>
</template>

<style>
.md-expand {
  background: #232323;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 4px;
}

.md-expand-titlerow {
  display: flex;
  align-items: center;
  gap: 4px;
}

.md-expand-icon {
  max-height: 1.2em;
  margin-top: 4px;
}
</style>
