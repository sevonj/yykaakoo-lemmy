<script setup lang="ts">
import type { GetSiteResponse, Person } from 'lemmy-js-client'
import { getCurrentInstance, ref } from 'vue'
import AvatarMicro from './AvatarMicro.vue'

const props = defineProps<{
  person?: Person
}>()

const appInstance = getCurrentInstance()
const site: GetSiteResponse = appInstance?.appContext.config.globalProperties.$localSite

const title = props.person ? (props.person?.display_name ?? props.person?.actor_id) : 'Guest'
const subtitle = props.person?.actor_id ?? new URL(site.site_view.site.actor_id).hostname

const isOpen = ref(false)

function toggleOpen(): void {
  isOpen.value = !isOpen.value
}
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
