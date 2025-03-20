<script setup lang="ts">
import { LemmyHttp } from 'lemmy-js-client'
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const site = await client.getSite()

function isRouteBrowse(): boolean {
  switch (route.name) {
    case 'frontpage':
      return true
    case 'community':
      return true
  }
  return false
}
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-instance-home" :class="isRouteBrowse() ? 'router-link-active' : ''">
      <img v-if="site.site_view.site.icon" class="nav-instance-logo" :src="site.site_view.site.icon" />
      <p>Browse</p>
    </RouterLink>
    <RouterLink to="/messages">Messages</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: x-large;
  flex-grow: 0;
  background: var(--color-background-soft);
  color: var(--color-navlink);
  overflow: scroll;
}

nav * {
  text-decoration: none;
}

.nav-instance-home {
  display: flex;
  height: 48px;
  align-items: center;
  padding: 8px 0 8px 8px;
  gap: 4px;
}

.nav-instance-home>img {
  max-height: 100%;
}

.router-link-active {
  color: var(--color-navlink-active);
}
</style>
