<script setup lang="ts">
import type { Community, Person } from 'lemmy-js-client'
import UserLink from '../links/UserLink.vue'
import CommunityLink from '../links/CommunityLink.vue'
import AvatarMicro from './AvatarMicro.vue'
import { personIdentifier } from '@/lib/actors'
import { UserIcon } from '@heroicons/vue/24/solid'

defineProps<{
  person: Person
  comm?: Community
  avatarOnly?: boolean
}>()
</script>

<template>
  <div class="meta user-meta-cont">
    <RouterLink :to="personIdentifier(person)">
      <AvatarMicro :src="person.avatar">
        <UserIcon v-if="!person.avatar" class="avatar-user-icon" />
      </AvatarMicro>
    </RouterLink>
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
