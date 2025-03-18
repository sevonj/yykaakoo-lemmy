<script setup lang="ts"></script>

<script lang="ts">
export type FeedLayoutType = 'Grid' | 'List'
export type FeedLocation = 'All' | 'Local' | 'Subscribed'
</script>

<template>
  <main>
    <p>User profile page for @{{ $route.params.username }}@{{ $route.params.instance }}</p>
  </main>

  <div style="min-height: 100vh"></div>
</template>

<style></style>
