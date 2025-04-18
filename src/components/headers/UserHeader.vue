<script setup lang="ts">
import type { GetPersonDetailsResponse } from 'lemmy-js-client'
import { personIdentifier } from '@/lib/actors'
import MarkdownExpander from '../common/MarkdownExpander.vue'

const props = defineProps<{
  user: GetPersonDetailsResponse
}>()

const identifier = personIdentifier(props.user.person_view.person)

function displayName(): string {
  if (props.user.person_view.person.display_name) {
    return props.user.person_view.person.display_name
  }
  return props.user.person_view.person.name
}
</script>

<template>
  <div class="community-header">
    <div class="community-header-titleblock">
      <div class="community-header-icon avatar">
        <img v-if="user.person_view.person.avatar" :src="user.person_view.person.avatar" />
      </div>

      <div class="community-header-title">
        <h1>{{ displayName() }}</h1>
        <p>{{ identifier }}</p>
      </div>
    </div>

    <div>
      <h3>Moderates</h3>
      <!--div class="community-header-modblock">
        <UserMeta v-for="mod in user.moderates" :person="mod.moderator" :key="mod.moderator.actor_id"
          :avatar-only=true />
      </div-->
    </div>

    <!--div>
      <h3>Languages</h3>
      <div class="community-header-langblock">
        <p v-if="user.person_view.person.la.length == 0">None</p>
        <Badge v-for="langId in user.discussion_languages" :text="langId.toString()" :key="langId" />
      </div>
    </div-->

    <MarkdownExpander
      title="Bio"
      class="person-header-bio"
      v-if="user.person_view.person.bio"
      :source="user.person_view.person.bio"
    />
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

.person-header-bio {
  width: 100%;
}
</style>
