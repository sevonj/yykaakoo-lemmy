<script setup lang="ts">
import { LinkIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  url: string
  thumbnailUrl?: string
  title?: string
  desc?: string
}>()

const urlObj = new URL(props.url)
</script>

<template>
  <div class="ext-link-cont">
    <a :href="url">
      <div class="ext-link-block">
        <div class="flex-1">
          <div class="flex-row">
            <LinkIcon class="meta-icon ext-link-icon" />
            <p>
              <span class="meta-highlight">{{ urlObj.hostname }}</span
              >{{ urlObj.pathname }}
            </p>
          </div>
          <h1 v-if="title">{{ title }}</h1>
          <p v-if="desc">{{ desc }}</p>
        </div>
        <img v-if="thumbnailUrl" :src="thumbnailUrl" class="ext-link-thumbnail" />
      </div>
    </a>
  </div>
</template>

<style>
.ext-link-cont {
  margin: 4px;
  outline: 1px solid var(--color-background);
  border-radius: 8px;
  overflow: hidden;
}

.ext-link-cont:hover {
  outline-color: var(--color-border);
}

.ext-link-block {
  padding: 4px;
  padding-left: 8px;
  text-wrap-mode: nowrap;
  display: flex;
  font-size: small;
  gap: 8px;
  transition: 0.1s;
  backdrop-filter: blur(64px) brightness(30%);
}

.ext-link-block * {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ext-link-icon {
  color: var(--color-metalink);
}

.ext-link-thumbnail {
  height: 96px;
  aspect-ratio: 3/2;
  object-fit: cover;
  margin: -4px -4px -4px 0;
}
</style>
