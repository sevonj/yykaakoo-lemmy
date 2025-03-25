<script setup lang="ts">
import {
  CubeIcon,
  EnvelopeIcon,
  FilmIcon,
  LinkIcon,
  MusicalNoteIcon,
  PhotoIcon,
  PuzzlePieceIcon,
} from '@heroicons/vue/24/solid'

defineProps<{
  mediaType?: string
}>()
</script>

<template>
  <div>
    <PuzzlePieceIcon v-if="mediaType == 'application'" />
    <MusicalNoteIcon v-else-if="mediaType == 'audio'" />
    <PhotoIcon v-else-if="mediaType == 'image'" />
    <EnvelopeIcon v-else-if="mediaType == 'message'" />
    <CubeIcon v-else-if="mediaType == 'model'" />
    <FilmIcon v-else-if="mediaType == 'video'" />

    <LinkIcon v-else />
  </div>
</template>
