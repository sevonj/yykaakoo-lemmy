<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const showDescription = ref(false)

function toggleDescription(): void {
  showDescription.value = !showDescription.value
}
</script>

<template>
  <div class="expand">
    <a @click="toggleDescription" class="expand-titlerow">
      <ChevronUpIcon class="expand-icon" v-if="showDescription" />
      <ChevronDownIcon class="expand-icon" v-else />
      <slot name="title"></slot>
    </a>
    <div class="expand-content" v-if="showDescription">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style>
.expand {
  background: #121212;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 8px;
}

.expand-titlerow {
  display: flex;
  align-items: center;
  gap: 4px;
}

.expand-icon {
  max-height: 1.2em;
  margin-top: 4px;
}

.expand-content {
  margin-top: 8px;
}
</style>
