<script setup lang="ts">
import type { GetSiteResponse } from 'lemmy-js-client'
import StatBadge from './common/StatBadge.vue'

defineProps<{
  site: GetSiteResponse
}>()
</script>
<template>
  <div style="display: flex; gap: 3px; flex-wrap: wrap">
    <StatBadge class="flex-1" title="software" :text="'lemmy_' + site.version" />
    <StatBadge
      class="flex-1"
      title="communities"
      :text="site.site_view.counts.communities.toString()"
    />
    <StatBadge
      class="flex-1"
      title="mau"
      :text="site.site_view.counts.users_active_month.toString()"
    />
    <StatBadge
      class="flex-1"
      title="nsfw"
      :text="site.site_view.local_site.enable_nsfw.toString()"
    />
    <StatBadge
      class="flex-1"
      title="downvotes"
      :text="site.site_view.local_site.enable_downvotes.toString()"
    />
    <StatBadge
      class="flex-1"
      title="federated"
      :text="site.site_view.local_site.federation_enabled.toString()"
    />
    <StatBadge
      class="flex-1"
      title="private"
      :text="site.site_view.local_site.private_instance.toString()"
    />
    <StatBadge class="flex-1" title="est." :text="site.site_view.local_site.published" />
  </div>

  <div class="flex-row">
    <div class="v-text">
      <h3>Admins</h3>
    </div>
    <ul class="flex-1">
      <li v-for="admin in site.admins" :key="admin.person.id">
        <UserAvatar :person="admin.person" />
        <p class="meta">@{{ admin.person.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
.v-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>

<style scoped>
ul {
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: black;
}

li {
  display: flex;
  gap: 0.5em;
  background: darkslategray;
}
</style>
