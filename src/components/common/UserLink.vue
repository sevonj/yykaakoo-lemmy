<script setup lang="ts">
import type { Person } from 'lemmy-js-client';
import urljoin from 'url-join';

const baseUrl = import.meta.env.BASE_URL;

const props = defineProps<{
  person: Person,
}>();

function hostname(): string {
  return new URL(props.person.actor_id).hostname;
}

function href(): string {
  return urljoin(baseUrl, `${new URL(props.person.actor_id).pathname}@${new URL(props.person.actor_id).hostname}`)
}

</script>

<template>
  <a :href="href()" class="meta"><span class="meta-highlight">@{{ props.person.name }}</span>@{{ hostname() }} </a>
</template>
