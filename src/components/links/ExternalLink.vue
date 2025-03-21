<script setup lang="ts">
import { LinkIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  url: string
}>()

const urlObj = new URL(props.url)
</script>

<template>
  <a :href="url" class="meta">
    <div class="ext-link-block">
      <LinkIcon class="meta-icon ext-link-icon" />
      <p>
        <span class="meta-highlight">{{ urlObj.hostname }}</span
        >{{ urlObj.pathname }}
      </p>
    </div>
  </a>
</template>

<style>
.ext-link-block {
  xborder: 1px solid var(--color-border);
  margin: 4px;
  padding: 4px 8px;
  text-wrap-mode: nowrap;
  background: var(--color-background);
  border-radius: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.ext-link-icon {
  color: var(--color-metalink);
}

.ext-link-block * {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
