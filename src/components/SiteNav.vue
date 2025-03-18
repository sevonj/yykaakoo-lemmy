<script setup lang="ts">

import { LemmyHttp } from 'lemmy-js-client'

import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const site = await client.getSite()

</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-instance-home">
      <img v-if="site.site_view.site.icon" class="nav-instance-logo" :src="site.site_view.site.icon">
      <h1>Browse</h1>
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
  font-size: larger;
  flex-grow: 0;
}

.nav-instance-home {
  display: flex;
  height: 48px;
  align-items: center;
  padding: 8px;
  gap: 4px;
}

.nav-instance-home>img {
  max-height: 100%;
}

.router-link-active {
  color: black;
  background-color: orange;
}
</style>
