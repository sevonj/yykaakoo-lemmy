<script setup lang="ts">
import UserHeader from '@/components/headers/UserHeader.vue'
import type { GetPersonDetails, LemmyHttp } from 'lemmy-js-client'
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const identifier = route.params.personIdentifier?.toString()

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const getPersonForm: GetPersonDetails = {
  username: identifier,
}
const user = await client.getPersonDetails(getPersonForm)
</script>

<template>
  <main>
    <UserHeader :user />
  </main>

  <div style="min-height: 100vh"></div>
</template>

<style></style>
