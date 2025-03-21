<script setup lang="ts">
import type { GetCommunityResponse } from 'lemmy-js-client'
import UserMeta from '../common/UserMeta.vue'
import Badge from '../common/BadgeThe.vue'

defineProps<{
  comm: GetCommunityResponse
  identifier: string
}>()
</script>

<template>
  <div class="community-header">
    <div class="community-header-titleblock">
      <div class="community-header-icon">
        <img v-if="comm.community_view.community.icon" :src="comm.community_view.community.icon" />
      </div>

      <div class="community-header-title">
        <h1>{{ comm.community_view.community.title }}</h1>
        <p>!{{ identifier }}</p>
      </div>
    </div>

    <div>
      <h3>Moderators</h3>
      <div class="community-header-modblock">
        <UserMeta
          v-for="mod in comm.moderators"
          :person="mod.moderator"
          :key="mod.moderator.actor_id"
          :avatar-only="true"
        />
      </div>
    </div>

    <div>
      <h3>Languages</h3>
      <div class="community-header-langblock">
        <p v-if="comm.discussion_languages.length == 0">None</p>
        <Badge
          v-for="langId in comm.discussion_languages"
          :text="langId.toString()"
          :key="langId"
        />
      </div>
    </div>

    <!--div v-if="comm.community_view.community.description" class="community-header-descblock">
      <a @click="toggleDescription" style="display: flex; align-items: center;">
        <h3 style="margin-right: 4px;">Description</h3>
        <ChevronUpIcon class="expand-icon" v-if="showDescription" />
        <ChevronDownIcon class="expand-icon" v-else />
      </a>
      <VueMarkdown v-if="showDescription" class="md community-header-desc"
        :source="comm.community_view.community.description" />
    </div-->
  </div>
</template>

<style>
.community-header {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.community-header > * {
  margin-right: 16px;
}

.community-header-titleblock {
  display: flex;
  gap: 16px;
  max-width: 100%;
  overflow: hidden;
}

.community-header-title * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.community-header-title h1 {
  color: #fafafa;
  line-height: 1.4em;
  font-weight: bold;
}

.community-header-icon {
  margin-top: 8px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-height: 64px;
  aspect-ratio: 1;
  background: darkslategray;
  border: 1px solid #444;
  overflow: hidden;
}

.community-header-icon > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.community-header-modblock {
  display: flex;
  flex-wrap: wrap;
}

.community-header-langblock {
  display: flex;
  flex-wrap: wrap;
}

.community-header-descblock {
  width: 100%;
  background: #232323;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 4px;
}

.expand-icon {
  max-height: 1.2em;
  margin-top: 6px;
}
</style>
