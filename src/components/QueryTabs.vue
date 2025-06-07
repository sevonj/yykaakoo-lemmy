<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
  title?: string
  query_key: string
  values: string[]
  default?: string
}>()

function isSelected(value: string): boolean {
  const selected = route.query[props.query_key]
  if (!selected) {
    return value === props.default
  }
  return selected === value
}

function setVal(value: string): void {
  const query = { ...route.query, [props.query_key]: value }
  router.push({ query })
}
</script>

<template>
  <div>
    <div class="feedsortbar">
      <p v-if="title" class="title">{{ title }}</p>
      <a
        v-for="value in values"
        v-bind:key="value"
        @click="setVal(value)"
        class="nav"
        :class="isSelected(value) ? 'selected' : ''"
        >{{ value }}</a
      >
    </div>
  </div>
</template>

<style scoped>
.feedsortbar {
  display: flex;
  margin-bottom: 6px;
  overflow: scroll;
  text-wrap-mode: nowrap;
}

.title {
  font-size: small;
  align-self: center;
  padding: 0 4px;
}

input {
  display: none;
}

input:checked + label {
  color: var(--color-navlink-active);
}

input + label {
  padding: 0 8px;
}
</style>
