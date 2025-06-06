<script setup lang="ts">
import { type GetSiteResponse } from 'lemmy-js-client'

import { getCurrentInstance, type Ref } from 'vue'
import ProfileMenu from './common/ProfileMenu.vue'
import SiteNav from './SiteNav.vue'

const instance = getCurrentInstance()
const site: Ref<GetSiteResponse> = instance?.appContext.config.globalProperties.$localSite
</script>

<template>
  <header>
    <RouterLink class="title-row" to="/">
      <img v-if="site.site_view.site.icon" class="site-logo" :src="site.site_view.site.icon" />
      <h1>{{ site.site_view.site.name }}</h1>
    </RouterLink>
    <SiteNav />
    <div class="flex-1"></div>
    <ProfileMenu />
  </header>
</template>

<style scoped>
header {
  padding-bottom: 0;
  display: flex;
  align-items: end;
  gap: 8px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-logo {
  height: 36px;
}

h1 {
  font-weight: 900;
  font-size: 2.2em;
  color: white;
  max-width: 24ch;
  letter-spacing: -2px;
}
</style>
