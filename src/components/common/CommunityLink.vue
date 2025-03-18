<script setup lang="ts">
import type { Community } from 'lemmy-js-client';
import urljoin from 'url-join';

const baseUrl = import.meta.env.BASE_URL;

const props = defineProps<{
  community: Community;
}>();

function hostname(): string {
  return new URL(props.community.actor_id).hostname;
}

function href(): string {
  return urljoin(baseUrl, `${new URL(props.community.actor_id).pathname}@${new URL(props.community.actor_id).hostname}`)
}

</script>

<template>
  <a :href="href()" class="meta"><span class="meta-highlight">!{{ props.community.name }}</span>@{{ hostname() }} </a>
</template>
