<script setup lang="ts">
import type { Person } from 'lemmy-js-client';
import { UserIcon } from '@heroicons/vue/24/solid'

defineProps<{
    person: Person;
}>()

</script>

<template>
    <div class="avatar">
        <img v-if="person.avatar" :src="person.avatar">
        <UserIcon v-else class="avatar-placeholder" />
    </div>
</template>

<style>
.avatar {
    width: 32px;
    aspect-ratio: 1;
    background: orangered;
    overflow: hidden;
}

.avatar-placeholder {
    color: #ffffff4f;
    width: 120%;
    position: relative;
    left: -10%;
    aspect-ratio: 1;
    object-fit: cover;
}

.avatar>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>