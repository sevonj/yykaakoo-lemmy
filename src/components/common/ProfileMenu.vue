<script setup lang="ts">
import { LemmyHttp, type GetSiteResponse } from 'lemmy-js-client'
import { getCurrentInstance, ref, watch, type Ref } from 'vue'
import AvatarMicro from './AvatarMicro.vue'
import { URL } from 'url'
import { personIdentifier } from '@/lib/actors'

const appInstance = getCurrentInstance()
const site: Ref<GetSiteResponse> = appInstance?.appContext.config.globalProperties.$localSite

const person = ref(site.value.my_user?.local_user_view.person)

const title = ref('Guest')
const subtitle = ref(new URL(site.value.site_view.site.actor_id).hostname)

const isOpen = ref(false)

function toggleOpen(): void {
  isOpen.value = !isOpen.value
}

function refresh(): void {
  console.log(`user: ${site.value.my_user}`)
  person.value = site.value.my_user?.local_user_view.person
  title.value = person.value?.display_name ?? person.value?.name ?? 'Guest'
  subtitle.value = person.value
    ? personIdentifier(person.value)
    : new URL(site.value.site_view.site.actor_id).hostname
}

async function logOut(): Promise<void> {
  if (!appInstance) {
    return
  }
  const url = appInstance.appContext.config.globalProperties.$instanceUrl.value.origin
  const newClient = new LemmyHttp(url)

  appInstance.appContext.config.globalProperties.$client.value = newClient
  appInstance.appContext.config.globalProperties.$localSite.value = await newClient.getSite()
}

watch(
  () => site.value.my_user,
  () => refresh(),
)

refresh()
</script>

<template>
  <div>
    <div class="cont link" :class="isOpen ? 'active' : ''" @click="toggleOpen">
      <AvatarMicro :src="person?.avatar" />
      <div class="title-col">
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <div class="dropdown-cont" v-if="isOpen">
      <div class="dropdown">
        <ul class="list">
          <li v-if="!person">
            <RouterLink to="/login">
              <a @click="toggleOpen">Log in </a>
            </RouterLink>
          </li>
          <li v-else>
            <a
              @click="
                () => {
                  toggleOpen()
                  logOut()
                }
              "
              >Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  width: 192px;
  flex-shrink: 0;
  margin: 4px;

  display: flex;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.cont:hover {
  color: #bbb;
  border-color: var(--color-border-hover);
}

.active {
  color: white !important;
  border-color: var(--color-border-hover);
}

.title-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
}

.title-col h3 {
  font-size: medium;
  font-weight: bold;
}

.title-col p {
  font-size: smaller;
}

.dropdown-cont {
  position: relative;
  width: 100%;
  height: 0;
  padding: 0 4px;
}

.dropdown {
  width: 100%;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 6px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list li {
  width: 100%;
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 6px;
}

.list li:hover {
  background: var(--color-background-mute);
  color: var(--color-text-hover) !important;
}
</style>
