<script setup lang="ts">
import type { Community, Person } from 'lemmy-js-client'
import UserAvatar from '../UserAvatar.vue'
import UserLink from '../links/UserLink.vue'
import CommunityLink from '../links/CommunityLink.vue'

defineProps<{
  person: Person
  comm?: Community
  avatarOnly?: boolean
}>()
</script>

<template>
  <div class="meta user-meta-cont">
    <UserAvatar :person />
    <div v-if="!avatarOnly" class="user-meta-links">
      <UserLink :person />
      <span v-if="comm"
        >to
        <CommunityLink :comm />
      </span>
    </div>
  </div>
</template>

<style>
.user-meta-cont {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
}

.user-meta-links {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap-mode: nowrap;
  line-height: 15px;
}
</style>
