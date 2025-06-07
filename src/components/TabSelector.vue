<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

type Tab = {
  label: string
  targetPath?: string
  routeName?: string | string[]
  query?: { key: string; val: string; isDefault?: boolean }
  callback?: () => void
  highlight?: boolean
}

const route = useRoute()
const router = useRouter()

defineProps<{
  title?: string
  tabs: Tab[]
}>()

function isSelected(tab: Tab): boolean {
  if (tab.routeName) {
    if (Array.isArray(tab.routeName)) {
      if (route.name && !tab.routeName.includes(route.name.toString())) {
        return false
      }
    } else if (route.name != tab.routeName) {
      return false
    }
  }

  if (tab.query) {
    const selected = route.query[tab.query.key]
    if (selected && tab.query.val != selected) {
      return false
    } else if (!selected && tab.query.isDefault != true) {
      return false
    }
  }

  return true
}

function cssClasses(tab: Tab): string {
  let classes = ''
  if (isSelected(tab)) {
    classes += 'selected'
  }
  if (tab.highlight) {
    classes += ' pseudo-active'
  }
  return classes
}

function select(tab: Tab): void {
  const path = tab.targetPath
  let query
  if (tab.query) {
    query = { ...route.query, [tab.query.key]: tab.query.val }
  }

  if (path || query) {
    router.push({ path, query })
  }

  if (tab.callback) {
    tab.callback()
  }
}
</script>

<template>
  <div>
    <div class="tabcont">
      <p v-if="title" class="title">{{ title }}</p>
      <a
        v-for="tab in tabs"
        v-bind:key="tab.label"
        @click="select(tab)"
        class="nav"
        :class="cssClasses(tab)"
        >{{ tab.label }}</a
      >
    </div>
  </div>
</template>

<style scoped>
.tabcont {
  display: flex;
  overflow: scroll;
  text-wrap-mode: nowrap;
}
</style>
