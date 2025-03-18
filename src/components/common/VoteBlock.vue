<script setup lang="ts">
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="post-side">
    <div style="width: 100%; flex-grow: 1; display: flex; flex-direction: column">
      <ArrowUpCircleIcon />
      <ArrowDownCircleIcon />
    </div>
  </div>
</template>

<style>
.post-side {
  color: #6a6977;
  flex-shrink: 0;
  width: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
</style>
