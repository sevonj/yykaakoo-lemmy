<script setup lang="ts">
import FeedComponent from '@/components/FeedComponent.vue'
import CommunityHeader from '@/components/headers/CommunityHeader.vue'
import type { GetCommunity, LemmyHttp } from 'lemmy-js-client'
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const identifier = route.params.identifier?.toString()

const instance = getCurrentInstance()
const client: LemmyHttp = instance?.appContext.config.globalProperties.$client

const getCommunityForm: GetCommunity = {
  name: identifier,
}
const comm = await client.getCommunity(getCommunityForm)
</script>

<template>
  <FeedComponent>
    <template v-slot:locationHeader>
      <CommunityHeader :comm :identifier />
    </template>
  </FeedComponent>
  <div style="min-height: 100vh"></div>
</template>

<style></style>
