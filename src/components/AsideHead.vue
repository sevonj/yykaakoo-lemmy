<script setup lang="ts">
import type { SiteView } from 'lemmy-js-client'
import { getCurrentInstance } from 'vue'

const props = defineProps<{
  site_view: SiteView
}>()
</script>

<template>
  <header>
    <img class="site-logo" :src="site_view.site.icon" />
    <h1 class="instance-title">{{ site_view.site.name }}</h1>
  </header>
</template>

<style scoped>
header {
  padding: 16px;
  background: orange;
  height: 192px;
  display: flex;
  flex-direction: column;
}

.site-logo {
  max-height: 128px;
  object-fit: contain;
  filter: drop-shadow(5px 5px 0px #322918);
}

h1 {
  font-weight: 900;
  font-variant: small-caps;
  font-size: 2em;
  color: white;
  text-shadow: #322918 4px 4px;
}
</style>
