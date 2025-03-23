<script setup lang="ts">
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

async function fetchUser(): Promise<void> {
  user.value = await client.getPersonDetails(getPersonForm)
}

fetchUser()
</script>

<template>
  <main>
    <UserHeader v-if="user" :user />
  </main>

  <div style="min-height: 100vh"></div>
</template>

<style></style>
