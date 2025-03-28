<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const instance = getCurrentInstance()
const site = instance?.appContext.config.globalProperties.$localSite

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
    <RouterLink
      class="nav-router site-nav-home"
      :class="isRouteBrowse() ? 'router-link-active' : ''"
      to="/"
    >
      <img
        v-if="site.site_view.site.icon"
        class="nav-instance-logo"
        :src="site.site_view.site.icon"
      />
      <p>Browse</p>
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
  font-size: x-large;
  flex-grow: 0;
  background: var(--color-background-soft);
  color: var(--color-navlink);
  overflow: scroll;
}

.site-nav-home {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-instance-logo {
  max-height: 1em;
}

.nav-instance-home > img {
  max-height: 100%;
}
</style>
