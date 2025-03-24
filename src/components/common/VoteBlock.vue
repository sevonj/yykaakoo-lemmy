<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'

defineProps<{
  upvotes: number
  downvotes: number
}>()
</script>

<template>
  <div class="vote-block">
    <a class="button-link">
      <ArrowUpIcon class="meta-icon" />
      <p>{{ upvotes }}</p>
    </a>
    <a class="button-link">
      <ArrowDownIcon class="meta-icon" />
      <p>{{ downvotes }}</p>
    </a>
  </div>
</template>

<style>
.vote-block {
  color: var(--color-meta);
  display: flex;
  align-items: center;
}
</style>
