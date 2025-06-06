<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

function isRouteBrowse(): boolean {
  switch (route.name) {
    case 'browse_frontpage':
      return true
    case 'community':
      return true
  }
  return false
}
</script>

<template>
  <nav class="site-nav">
    <RouterLink class="nav-router" :class="isRouteBrowse() ? 'router-link-active' : ''" to="/">
      Browse
    </RouterLink>
    <RouterLink class="nav-router" to="/messages">Messages</RouterLink>
    <RouterLink class="nav-router" to="/profile">Profile</RouterLink>
    <RouterLink class="nav-router" to="/settings">Settings</RouterLink>
    <RouterLink class="nav-router" to="/about">About</RouterLink>
  </nav>
</template>

<style>
.site-nav {
  padding: 8px;
  display: flex;
  align-items: center;
  font-size: larger;
  flex-grow: 0;
  background: var(--color-background-soft);
  color: var(--color-navlink);
  overflow: scroll;
}
</style>
