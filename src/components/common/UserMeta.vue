<script setup lang="ts">
import type { Person } from 'lemmy-js-client';
import UserAvatar from '../UserAvatar.vue'

defineProps<{
    person: Person;
}>()

</script>

<template>
    <div class="meta" style="display: flex; flex-direction: row; gap: 1em; align-items: center;">
        <UserAvatar :person />
        <p>@{{ person.name }}@{{ person.instance_id }}</p>

        <slot name="badges"></slot>

    </div>
</template>
