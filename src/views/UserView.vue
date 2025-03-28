<script setup lang="ts">
import FeedThe, { type FeedLocation } from '@/components/FeedThe.vue'
import UserHeader from '@/components/headers/UserHeader.vue'
import type { GetPersonDetails, GetPersonDetailsResponse, LemmyHttp } from 'lemmy-js-client'
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const identifier = route.params.personIdentifier?.toString()

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const getPersonForm: GetPersonDetails = {
  username: identifier,
}

const user = ref<GetPersonDetailsResponse | undefined>()
const feedLocation = ref<FeedLocation | undefined>()

async function fetchUser(): Promise<void> {
  user.value = await client.getPersonDetails(getPersonForm)
  feedLocation.value = { v: 'Person', id: user.value.person_view.person.id }
}

fetchUser()
</script>

<template>
  <div>
    <header>
      <UserHeader v-if="user" :user />
    </header>
    <FeedThe v-if="feedLocation" :feed-location />

    <div style="min-height: 100vh"></div>
  </div>
</template>

<style></style>
