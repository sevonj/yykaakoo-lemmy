<script setup lang="ts">
import type { GetSiteResponse } from 'lemmy-js-client'
import ActorTitleBlock from './common/ActorTitleBlock.vue'
import MarkdownView from './markdown/MarkdownView.vue'

const props = defineProps<{
  site: GetSiteResponse
}>()

// const siteHostname = hostname(props.site.site_view.site.actor_id)

const subtitle = props.site.site_view.site.description ? props.site.site_view.site.description : ''
</script>
<template>
  <div class="instance-meta">
    <ActorTitleBlock
      :img-src="site.site_view.site.icon"
      :title="site.site_view.site.name"
      :subtitle
    />
    <MarkdownView v-if="site.site_view.site.sidebar" :source="site.site_view.site.sidebar" />

    <!--div style="display: flex; gap: 3px; flex-wrap: wrap">
    <StatBadge class="flex-1" title="software" :text="'lemmy_' + site.version" />
    <StatBadge class="flex-1" title="communities" :text="site.site_view.counts.communities.toString()" />
    <StatBadge class="flex-1" title="mau" :text="site.site_view.counts.users_active_month.toString()" />
    <StatBadge class="flex-1" title="nsfw" :text="site.site_view.local_site.enable_nsfw.toString()" />
    <StatBadge class="flex-1" title="downvotes" :text="site.site_view.local_site.enable_downvotes.toString()" />
    <StatBadge class="flex-1" title="federated" :text="site.site_view.local_site.federation_enabled.toString()" />
    <StatBadge class="flex-1" title="private" :text="site.site_view.local_site.private_instance.toString()" />
    <StatBadge class="flex-1" title="est." :text="site.site_view.local_site.published" />
  </div-->

    <!--div class="flex-row">
    <div class="v-text">
      <h3>Admins</h3>
    </div>
    <ul class="flex-1">
      <li v-for="admin in site.admins" :key="admin.person.id">
        <UserAvatar :person="admin.person" />
        <p class="meta">@{{ admin.person.name }}</p>
      </li>
    </ul>
  </div-->
  </div>
</template>

<style>
.instance-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
